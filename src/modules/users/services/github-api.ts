import { GitHubUser } from '../github-types';

const GITHUB_API_BASE_URL = 'https://api.github.com';

export const githubQueryKeys = {
  users: () => ['github', 'users'],
  user: (username: string) => ['github', 'user', username],
};

export class GitHubService {
  async getUsers(): Promise<GitHubUser[]> {
    try {
      const response = await fetch(`${GITHUB_API_BASE_URL}/users`);
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch GitHub users:', error);
      throw error;
    }
  }
}

const githubService = new GitHubService();
export default githubService;