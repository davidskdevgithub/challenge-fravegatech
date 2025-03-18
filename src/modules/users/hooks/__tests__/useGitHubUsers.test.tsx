import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGitHubUsers } from '../useGitHubUsers';
import githubService, { githubQueryKeys } from '../../services/github-api';
import { mockUsers } from '../../mocks/github-users-mock';

// Mock the GitHub service
vi.mock('../../services/github-api', () => ({
  default: {
    getUsers: vi.fn(),
  },
  githubQueryKeys: {
    users: () => ['github', 'users'],
  },
}));

// Create a wrapper for the React Query Provider
const createQueryWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0, // Disable caching for tests
      },
    },
  });
  
  const QueryWrapper: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  
  return QueryWrapper;
};

describe('useGitHubUsers', () => {
  const mockGetUsers = githubService.getUsers as ReturnType<typeof vi.fn>;
  
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return users data when API call succeeds', async () => {
    // Mock service to return test data
    mockGetUsers.mockResolvedValueOnce(mockUsers);
    
    // Render the hook with React Query provider
    const { result } = renderHook(() => useGitHubUsers(), {
      wrapper: createQueryWrapper(),
    });
    
    // Initially should be loading with empty users array
    expect(result.current.isLoading).toBe(true);
    expect(result.current.users).toEqual([]);
    
    // Wait for the query to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    // Should have data and no error
    expect(result.current.users).toEqual(mockUsers);
    expect(result.current.error).toBeNull();
  });

  it('should handle error states', async () => {
    // Mock service to throw an error
    const testError = new Error('API error');
    mockGetUsers.mockRejectedValueOnce(testError);
    
    // Render the hook with React Query provider
    const { result } = renderHook(() => useGitHubUsers(), {
      wrapper: createQueryWrapper(),
    });
    
    // Wait for the query to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    // Should have error and empty users array
    expect(result.current.error).toEqual(testError);
    expect(result.current.users).toEqual([]);
  });

  it('should accept and use data transformation', async () => {
    // Mock service to return test data
    mockGetUsers.mockResolvedValueOnce(mockUsers);
    
    // Type for simplified user
    type SimplifiedUser = { name: string; id: number };
    
    // Render the hook with an inline select function
    const { result } = renderHook(() => 
      useGitHubUsers<SimplifiedUser[]>({
        queryKey: githubQueryKeys.users(),
        select: (data) => data.map(user => ({
          name: user.login,
          id: user.id
        }))
      }), 
      {
        wrapper: createQueryWrapper(),
      }
    );
    
    // Wait for the query to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    // Check that data was transformed correctly
    expect(result.current.users[0]).toHaveProperty('name');
    expect(result.current.users[0]).toHaveProperty('id');
    expect(result.current.users[0].name).toBe(mockUsers[0].login);
  });

  it('should allow refetching data', async () => {
    // Setup mock to return different values on subsequent calls
    mockGetUsers.mockResolvedValueOnce(mockUsers);
    
    const updatedUsers = [...mockUsers];
    updatedUsers[0] = { ...mockUsers[0], login: 'updated-user' };
    mockGetUsers.mockResolvedValueOnce(updatedUsers);
    
    // Render the hook
    const { result } = renderHook(() => useGitHubUsers(), {
      wrapper: createQueryWrapper(),
    });
    
    // Wait for initial data load
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    // Verify initial data
    expect(result.current.users).toEqual(mockUsers);
    
    // Trigger refetch
    result.current.refetch();
    
    // Wait for refetch to complete
    await waitFor(() => {
      expect(result.current.users[0].login).toBe('updated-user');
    });
    
    // Verify data was updated
    expect(result.current.users).toEqual(updatedUsers);
    expect(mockGetUsers).toHaveBeenCalledTimes(2);
  });
});