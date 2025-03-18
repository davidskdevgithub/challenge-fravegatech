import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGitHubUserDetails } from '../useGitHubUserDetails';
import githubService from '../../services/github-api';
import { mockUserDetail } from '../../mocks/github-users-mock';

// Mock the GitHub service
vi.mock('../../services/github-api', () => ({
  default: {
    getUserDetails: vi.fn(),
  },
  githubQueryKeys: {
    user: (username: string) => ['github', 'user', username],
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

describe('useGitHubUserDetails', () => {
  const mockGetUserDetails = githubService.getUserDetails as ReturnType<typeof vi.fn>;
  const testUsername = 'testuser';
  
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return user details when API call succeeds', async () => {
    // Mock service to return test data
    mockGetUserDetails.mockResolvedValueOnce(mockUserDetail);
    
    // Render the hook with React Query provider
    const { result } = renderHook(() => useGitHubUserDetails(testUsername), {
      wrapper: createQueryWrapper(),
    });
    
    // Initially should be loading with undefined user
    expect(result.current.isLoading).toBe(true);
    expect(result.current.user).toBeUndefined();
    
    // Wait for the query to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    // Should have data and no error
    expect(result.current.user).toEqual(mockUserDetail);
    expect(result.current.error).toBeNull();
    expect(mockGetUserDetails).toHaveBeenCalledWith(testUsername);
  });

  it('should handle error states', async () => {
    // Mock service to throw an error
    const testError = new Error('API error');
    mockGetUserDetails.mockRejectedValueOnce(testError);
    
    // Render the hook with React Query provider
    const { result } = renderHook(() => useGitHubUserDetails(testUsername), {
      wrapper: createQueryWrapper(),
    });
    
    // Wait for the query to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    // Should have error and undefined user
    expect(result.current.error).toEqual(testError);
    expect(result.current.user).toBeUndefined();
  });

  it('should not fetch data if username is empty', async () => {
    // Render the hook with empty username
    const { result } = renderHook(() => useGitHubUserDetails(''), {
      wrapper: createQueryWrapper(),
    });
    
    // Should not be loading and have no data
    expect(result.current.isLoading).toBe(false);
    expect(result.current.user).toBeUndefined();
    
    // Service should not have been called
    expect(mockGetUserDetails).not.toHaveBeenCalled();
  });

  it('should accept and use data transformation', async () => {
    // Mock service to return test data
    mockGetUserDetails.mockResolvedValueOnce(mockUserDetail);
    
    // Type for simplified user
    type SimplifiedUserDetail = { name: string; followers: number };
    
    // Render the hook with an inline select function
    const { result } = renderHook(() => 
      useGitHubUserDetails<SimplifiedUserDetail>(testUsername, {
        select: (data) => ({
          name: data.name,
          followers: data.followers
        })
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
    expect(result.current.user).toHaveProperty('name');
    expect(result.current.user).toHaveProperty('followers');
    expect(result.current.user?.name).toBe(mockUserDetail.name);
    expect(result.current.user?.followers).toBe(mockUserDetail.followers);
    expect(Object.keys(result.current.user || {}).length).toBe(2);
  });

  it('should allow refetching data', async () => {
    // Setup mock to return different values on subsequent calls
    mockGetUserDetails.mockResolvedValueOnce(mockUserDetail);
    
    const updatedUserDetail = { ...mockUserDetail, name: 'Updated User' };
    mockGetUserDetails.mockResolvedValueOnce(updatedUserDetail);
    
    // Render the hook
    const { result } = renderHook(() => useGitHubUserDetails(testUsername), {
      wrapper: createQueryWrapper(),
    });
    
    // Wait for initial data load
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    // Verify initial data
    expect(result.current.user).toEqual(mockUserDetail);
    
    // Trigger refetch
    result.current.refetch();
    
    // Wait for refetch to complete
    await waitFor(() => {
      expect(result.current.user?.name).toBe('Updated User');
    });
    
    // Verify data was updated
    expect(result.current.user).toEqual(updatedUserDetail);
    expect(mockGetUserDetails).toHaveBeenCalledTimes(2);
  });
});