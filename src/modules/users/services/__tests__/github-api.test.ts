import { describe, it, expect, vi, beforeEach } from 'vitest';
import githubService from '../github-api';
import { mockUsers, mockUserDetail } from '../../mocks/github-users-mock';

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

  describe('getUserDetails', () => {
    it('should fetch user details successfully', async () => {
      // Mock successful response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUserDetail,
      });

      const username = 'testuser';
      const userDetails = await githubService.getUserDetails(username);
      
      // Assert fetch was called correctly with the right username
      expect(mockFetch).toHaveBeenCalledWith(`https://api.github.com/users/${username}`);
      
      // Assert the result matches our mock data
      expect(userDetails).toEqual(mockUserDetail);
    });

    it('should handle API errors when fetching user details', async () => {
      // Mock error response
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      // Assert that the service throws an error
      await expect(githubService.getUserDetails('nonexistentuser')).rejects.toThrow('GitHub API error: 404 Not Found');
    });

    it('should handle network errors when fetching user details', async () => {
      // Mock network failure
      mockFetch.mockRejectedValueOnce(new Error('Network failure'));

      // Assert that the service throws an error
      await expect(githubService.getUserDetails('testuser')).rejects.toThrow('Network failure');
    });

    it('should properly encode usernames with special characters', async () => {
      // Mock successful response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUserDetail,
      });

      const usernameWithSpecialChars = 'test/user?';
      await githubService.getUserDetails(usernameWithSpecialChars);
      
      // Assert fetch was called with properly encoded username
      expect(mockFetch).toHaveBeenCalledWith(`https://api.github.com/users/${encodeURIComponent(usernameWithSpecialChars)}`);
    });
  });

  describe('searchUsers', () => {
    it('should search users successfully', async () => {
      // Create mock search response
      const mockSearchResponse = {
        items: mockUsers,
        total_count: mockUsers.length,
        incomplete_results: false
      };

      // Mock successful response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSearchResponse,
      });

      const query = 'test';
      const searchResults = await githubService.searchUsers(query);
      
      // Assert fetch was called correctly with the right query
      expect(mockFetch).toHaveBeenCalledWith(`https://api.github.com/search/users?q=${encodeURIComponent(query)}`);
      
      // Assert the result matches our mock data
      expect(searchResults).toEqual(mockUsers);
    });

    it('should handle API errors when searching users', async () => {
      // Mock error response
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 422,
        statusText: 'Unprocessable Entity',
      });

      // Assert that the service throws an error
      await expect(githubService.searchUsers('invalid query')).rejects.toThrow('GitHub API error: 422 Unprocessable Entity');
    });

    it('should handle network errors when searching users', async () => {
      // Mock network failure
      mockFetch.mockRejectedValueOnce(new Error('Network failure'));

      // Assert that the service throws an error
      await expect(githubService.searchUsers('test')).rejects.toThrow('Network failure');
    });

    it('should properly encode search queries with special characters', async () => {
      // Create mock search response
      const mockSearchResponse = {
        items: mockUsers,
        total_count: mockUsers.length,
        incomplete_results: false
      };

      // Mock successful response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSearchResponse,
      });

      const queryWithSpecialChars = 'test/user?';
      await githubService.searchUsers(queryWithSpecialChars);
      
      // Assert fetch was called with properly encoded query
      expect(mockFetch).toHaveBeenCalledWith(`https://api.github.com/search/users?q=${encodeURIComponent(queryWithSpecialChars)}`);
    });
  });

});