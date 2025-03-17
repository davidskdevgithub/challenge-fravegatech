import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UserCard } from '../components';
import { GitHubUser } from '../github-types';
import { mockUsers } from '../mocks/github-users-mock';

// Mock the next/image component
vi.mock('next/image', () => ({
  default: (props: { src: string; alt: string; 'data-testid'?: string; className?: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img 
      src={props.src} 
      alt={props.alt} 
      data-testid={props['data-testid']}
      className={props.className}
    />;
  }
}));

describe('UserCard', () => {
  const mockUser: GitHubUser = mockUsers[0];

  it('renders the user card with correct information', () => {
    render(<UserCard user={mockUser} />);
    
    // Check if the username is displayed
    const username = screen.getByTestId('user-name');
    expect(username.textContent).toBe('mojombo');
    
    // Check if the avatar is rendered with correct src
    const avatar = screen.getByTestId('user-avatar');
    expect(avatar.getAttribute('src')).toBe('https://avatars.githubusercontent.com/u/1?v=4');
    
    // Check if the favorite button is present
    const favoriteButton = screen.getByTestId('favorite-button');
    expect(favoriteButton).toBeDefined();
  });
});