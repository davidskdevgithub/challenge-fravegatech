import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserFavorite } from '../user-favorite';

// Mock the useFavorite hook
vi.mock('../../hooks/useFavorite', () => ({
  useFavorite: vi.fn()
}));

// Import the mocked hook
import { useFavorite } from '../../hooks/useFavorite';

describe('UserFavorite', () => {
  const mockToggleFavorite = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('renders non-favorite state correctly', () => {
    // Mock the hook to return non-favorite state
    (useFavorite as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isFavorite: false,
      toggleFavorite: mockToggleFavorite
    });
    
    render(<UserFavorite username="testuser" />);
    
    // Check if the button has the correct aria-label
    const favoriteButton = screen.getByTestId('favorite-button');
    expect(favoriteButton.getAttribute('aria-label')).toBe('Add to favorites');
    
    // Check if the non-favorite star (☆) is displayed
    const starIcon = favoriteButton.querySelector('span');
    expect(starIcon?.textContent).toBe('☆');
    
    // Check if the non-favorite styling is applied - using a more specific check
    expect(starIcon?.className.split(' ')).toContain('text-gray-400');
    // Make sure it doesn't have the exact 'text-yellow-500' class (ignoring hover states)
    expect(starIcon?.className.split(' ')).not.toContain('text-yellow-500');
  });
  
  it('renders favorite state correctly', () => {
    // Mock the hook to return favorite state
    (useFavorite as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isFavorite: true,
      toggleFavorite: mockToggleFavorite
    });
    
    render(<UserFavorite username="testuser" />);
    
    // Check if the button has the correct aria-label
    const favoriteButton = screen.getByTestId('favorite-button');
    expect(favoriteButton.getAttribute('aria-label')).toBe('Remove from favorites');
    
    // Check if the favorite star (★) is displayed
    const starIcon = favoriteButton.querySelector('span');
    expect(starIcon?.textContent).toBe('★');
    
    // Check if the favorite styling is applied
    expect(starIcon?.className.split(' ')).toContain('text-yellow-500');
    expect(starIcon?.className.split(' ')).not.toContain('text-gray-400');
  });
  
  it('calls toggleFavorite when clicked', () => {
    // Mock the hook
    (useFavorite as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isFavorite: false,
      toggleFavorite: mockToggleFavorite
    });
    
    render(<UserFavorite username="testuser" />);
    
    // Get the button and click it
    const favoriteButton = screen.getByTestId('favorite-button');
    fireEvent.click(favoriteButton);
    
    // Check if toggleFavorite was called
    expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
  });
  
  it('applies custom className when provided', () => {
    // Mock the hook
    (useFavorite as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isFavorite: false,
      toggleFavorite: mockToggleFavorite
    });
    
    render(<UserFavorite username="testuser" className="custom-class" />);
    
    // Check if the custom class is applied
    const favoriteButton = screen.getByTestId('favorite-button');
    expect(favoriteButton.className).toContain('custom-class');
  });
  
  it('passes the correct username to useFavorite hook', () => {
    // Mock the hook
    (useFavorite as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isFavorite: false,
      toggleFavorite: mockToggleFavorite
    });
    
    render(<UserFavorite username="testuser" />);
    
    // Check if the hook was called with the correct username
    expect(useFavorite).toHaveBeenCalledWith('testuser');
  });
});