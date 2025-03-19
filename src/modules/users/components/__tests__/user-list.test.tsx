import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserList } from '../user-list';
import { useGitHubUsers } from '../../hooks/useGitHubUsers';
import { mockUsers } from '../../mocks/github-users-mock';
import { GitHubUser } from '../../github-types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the useGitHubUsers hook
vi.mock('../../hooks/useGitHubUsers');

// Mock the UserCard component to simplify testing
vi.mock('../user-card', () => ({
  UserCard: ({ user }: { user: GitHubUser }) => (
    <div data-testid={`user-card-${user.id}`}>{user.login}</div>
  ),
}));

// Create a wrapper for React Query
const createQueryWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0, // Disable garbage collection for tests
      },
    },
  });
  
  const QueryWrapper: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  
  return QueryWrapper;
};

describe('UserList', () => {
  const mockUseGitHubUsers = useGitHubUsers as ReturnType<typeof vi.fn>;
  
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should show loading state when data is being fetched', () => {
    // Mock hook to return loading state
    mockUseGitHubUsers.mockReturnValue({
      users: [],
      isLoading: true,
      error: null,
      refetch: vi.fn(),
    });
    
    render(<UserList searchQuery="" />, { wrapper: createQueryWrapper() });
    
    // Check if loading indicator is shown
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should render users when data is loaded', async () => {
    // Mock hook to return user data
    mockUseGitHubUsers.mockReturnValue({
      users: mockUsers,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });
    
    render(<UserList searchQuery="" />, { wrapper: createQueryWrapper() });
    
    // Check if all users are rendered
    mockUsers.forEach(user => {
      expect(screen.getByTestId(`user-card-${user.id}`)).toBeInTheDocument();
      expect(screen.getByText(user.login)).toBeInTheDocument();
    });
  });

  it('should handle error state', () => {
    // Mock hook to return error
    mockUseGitHubUsers.mockReturnValue({
      users: [],
      isLoading: false,
      error: new Error('Failed to fetch'),
      refetch: vi.fn(),
    });
    
    render(<UserList searchQuery="" />, { wrapper: createQueryWrapper() });
    
    // Check if error message is shown
    expect(screen.getByText(/Error loading users/i)).toBeInTheDocument();
    expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument();
    
    // If you have a retry button in your error state:
    const retryButton = screen.getByRole('button', { name: /retry/i });
    expect(retryButton).toBeInTheDocument();
  });

  it('should show empty state when no users are found', () => {
    // Mock hook to return empty array
    mockUseGitHubUsers.mockReturnValue({
      users: [],
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });
    
    render(<UserList searchQuery="" />, { wrapper: createQueryWrapper() });
    
    // Check if empty state message is shown
    expect(screen.getByText(/No users found/i)).toBeInTheDocument();
  });

  it('should call refetch when retry button is clicked', async () => {
    // Create a mock function for refetch
    const mockRefetch = vi.fn();
    
    // Mock hook to return error with the mock refetch function
    mockUseGitHubUsers.mockReturnValue({
      users: [],
      isLoading: false,
      error: new Error('Failed to fetch'),
      refetch: mockRefetch,
    });
    
    render(<UserList searchQuery="" />, { wrapper: createQueryWrapper() });
    
    // Find and click the retry button
    const retryButton = screen.getByRole('button', { name: /retry/i });
    retryButton.click();
    
    // Verify refetch was called
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });
  
  it('should pass search query to useGitHubUsers hook', () => {
    // Mock hook to return empty array
    mockUseGitHubUsers.mockReturnValue({
      users: [],
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });
    
    const searchQuery = 'test query';
    render(<UserList searchQuery={searchQuery} />, { wrapper: createQueryWrapper() });
    
    // Verify that the hook was called with the correct search query
    expect(mockUseGitHubUsers).toHaveBeenCalledWith(searchQuery);
  });
});