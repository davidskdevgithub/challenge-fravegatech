import { GitHubUser } from '../github-types';

const GITHUB_API_BASE_URL = 'https://api.github.com';

export const githubQueryKeys = {
  users: () => ['github', 'users'],
  user: (username: string) => ['github', 'user', username],
  searchUsers: (query: string) => ['github', 'search', 'users', query],
};

export class GitHubService {
  private async fetchFromGitHub<T>(endpoint: string, errorMessage: string): Promise<T> {
    try {
      const response = await fetch(`${GITHUB_API_BASE_URL}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(errorMessage, error);
      throw error;
    }
  }

  async getUsers(): Promise<GitHubUser[]> {
    return this.fetchFromGitHub<GitHubUser[]>(
      '/users',
      'Failed to fetch GitHub users:'
    );
  }

  async getUserDetails(username: string): Promise<GitHubUser> {
    return this.fetchFromGitHub<GitHubUser>(
      `/users/${encodeURIComponent(username)}`,
      `Failed to fetch GitHub user details for ${username}:`
    );
  }

  async searchUsers(query: string): Promise<GitHubUser[]> {
    const request = await this.fetchFromGitHub<{ items: GitHubUser[], total_count: number, incomplete_results: boolean }>(
      `/search/users?q=${encodeURIComponent(query)}`,
      `Failed to search GitHub users for "${query}":`
    );

    return request.items;
  }
}

const githubService = new GitHubService();
export default githubService;