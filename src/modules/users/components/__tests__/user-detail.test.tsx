import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UserDetail } from '../user-detail';
import { GitHubUser } from '../../github-types';
import { mockUserDetail } from '../../mocks/github-users-mock';

// Mock the next/image component
vi.mock('next/image', () => ({
  default: (props: { src: string; alt: string; fill?: boolean; 'data-testid'?: string; className?: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img 
      src={props.src} 
      alt={props.alt} 
      data-testid={props['data-testid']}
      className={props.className}
    />;
  }
}));

// Mock the UserFavorite component
vi.mock('../user-favorite', () => ({
  UserFavorite: ({ username, className }: { username: string; className?: string }) => (
    <button data-testid="favorite-button" className={className}>
      Favorite {username}
    </button>
  )
}));

describe('UserDetail', () => {
  const mockUser: GitHubUser = mockUserDetail;

  it('renders the user detail with correct information', () => {
    render(<UserDetail user={mockUser} />);
    
    // Check if the username is displayed
    const username = screen.getByTestId('user-name');
    expect(username.textContent).toBe(mockUser.login);
    
    // Check if the avatar is rendered with correct src
    const avatar = screen.getByTestId('user-avatar');
    expect(avatar.getAttribute('src')).toBe(mockUser.avatar_url);
    
    // Check if the favorite button is present
    const favoriteButton = screen.getByTestId('favorite-button');
    expect(favoriteButton).toBeDefined();
    
    // Check if the GitHub link is present and has the correct href
    const githubLink = screen.getByTestId('github-link');
    expect(githubLink.getAttribute('href')).toBe(`https://github.com/${mockUser.login}`);
    
    // Check if bio is displayed when available
    if (mockUser.bio) {
      expect(screen.getByText(mockUser.bio)).toBeDefined();
    }
    
    // Check if stats section contains key information
    expect(screen.getByText('Repositories')).toBeDefined();
    expect(screen.getByText('Gists')).toBeDefined();
    expect(screen.getByText('Followers')).toBeDefined();
    expect(screen.getByText('Following')).toBeDefined();
    
    // Check if the stats values are displayed
    if (mockUser.public_repos !== undefined) {
      expect(screen.getByText(mockUser.public_repos.toString())).toBeDefined();
    }
    if (mockUser.public_gists !== undefined) {
      expect(screen.getByText(mockUser.public_gists.toString())).toBeDefined();
    }
    if (mockUser.followers !== undefined) {
      expect(screen.getByText(mockUser.followers.toString())).toBeDefined();
    }
    if (mockUser.following !== undefined) {
      expect(screen.getByText(mockUser.following.toString())).toBeDefined();
    }
  });

  it('renders "User not found" when no user is provided', () => {
    render(<UserDetail />);
    
    // Check if the "User not found" message is displayed
    expect(screen.getByText('User not found')).toBeDefined();
    
    // Ensure that user details are not rendered
    expect(screen.queryByTestId('user-avatar')).toBeNull();
    expect(screen.queryByTestId('user-name')).toBeNull();
    expect(screen.queryByTestId('github-link')).toBeNull();
  });

  it('renders optional user information when available', () => {
    render(<UserDetail user={mockUser} />);
    
    // Check if company is displayed when available
    if (mockUser.company) {
      // Company is now displayed in the Organizations section
      const orgs = mockUser.company.split(',');
      for (const org of orgs) {
        expect(screen.getByText(org.trim())).toBeDefined();
      }
      expect(screen.getByText('Organizations')).toBeDefined();
    }
    
    // Check if location is displayed when available
    if (mockUser.location) {
      expect(screen.getByText(mockUser.location)).toBeDefined();
    }
    
    // Check if blog is displayed when available
    if (mockUser.blog) {
      const blogLinks = screen.getAllByText(mockUser.blog);
      expect(blogLinks.length).toBeGreaterThan(0);
    }
    
    // Check if Twitter username is displayed when available
    if (mockUser.twitter_username) {
      // Look for the Twitter link instead of just the text
      const twitterLink = screen.getByRole('link', { 
        name: new RegExp(`@${mockUser.twitter_username}`) 
      });
      expect(twitterLink).toBeDefined();
      expect(twitterLink.getAttribute('href')).toBe(`https://twitter.com/${mockUser.twitter_username}`);
    }
  });

  it('displays membership duration information', () => {
    render(<UserDetail user={mockUser} />);
    
    // Check if membership duration is displayed
    if (mockUser.created_at) {
      expect(screen.getByText(/GitHub member for/)).toBeDefined();
    }
  });
});