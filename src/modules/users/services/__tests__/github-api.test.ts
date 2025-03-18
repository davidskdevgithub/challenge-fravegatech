import { describe, it, expect, vi, beforeEach } from 'vitest';
import githubService from '../github-api';
import { mockUsers } from '../../mocks/github-users-mock';

// Mock the global fetch function
const mockFetch = vi.fn() as ReturnType<typeof vi.fn>;
global.fetch = mockFetch;

describe('GitHubService', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe('getUsers', () => {
    it('should fetch users successfully', async () => {
      // Mock successful response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      });

      const users = await githubService.getUsers();
      
      // Assert fetch was called correctly
      expect(mockFetch).toHaveBeenCalledWith('https://api.github.com/users');
      
      // Assert the result matches our mock data
      expect(users).toEqual(mockUsers);
    });

    it('should handle API errors', async () => {
      // Mock error response
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
        statusText: 'Forbidden',
      });

      // Assert that the service throws an error
      await expect(githubService.getUsers()).rejects.toThrow('GitHub API error: 403 Forbidden');
    });

    it('should handle network errors', async () => {
      // Mock network failure
      mockFetch.mockRejectedValueOnce(new Error('Network failure'));

      // Assert that the service throws an error
      await expect(githubService.getUsers()).rejects.toThrow('Network failure');
    });
  });
});