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
    expect(githubLink.getAttribute('href')).toBe(mockUser.html_url);
    
    // Check if bio is displayed when available
    if (mockUser.bio) {
      expect(screen.getByText(mockUser.bio)).toBeDefined();
    }
    
    // Check if profile info section contains key information
    expect(screen.getByText(`User ID: ${mockUser.id}`)).toBeDefined();
    expect(screen.getByText(`Public Repos: ${mockUser.public_repos}`)).toBeDefined();
    expect(screen.getByText(`Followers: ${mockUser.followers}`)).toBeDefined();
    expect(screen.getByText(`Following: ${mockUser.following}`)).toBeDefined();
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
      expect(screen.getByText(mockUser.company)).toBeDefined();
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

  it('formats dates correctly', () => {
    render(<UserDetail user={mockUser} />);
    
    // Check if created_at date is formatted correctly
    if (mockUser.created_at) {
      const date = new Date(mockUser.created_at);
      const formattedDate = date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      expect(screen.getByText(`Created: ${formattedDate}`)).toBeDefined();
    }
    
    // Check if updated_at date is formatted correctly
    if (mockUser.updated_at) {
      const date = new Date(mockUser.updated_at);
      const formattedDate = date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      expect(screen.getByText(`Updated: ${formattedDate}`)).toBeDefined();
    }
  });
});