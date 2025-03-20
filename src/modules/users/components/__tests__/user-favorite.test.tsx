import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserFavorite } from '../user-favorite';

// Mock the useFavorite hook
vi.mock('../../hooks/useFavorite', () => ({
  useFavorite: vi.fn()
}));

// Mock the Lucide React Star component
vi.mock('lucide-react', () => ({
  Star: (props: { className?: string }) => (
    <svg 
      data-testid="star-icon" 
      className={props.className || ''}
    ></svg>
  )
}));

// Import the mocked hook
import { useFavorite } from '../../hooks/useFavorite';

describe('UserFavorite', () => {
  const mockToggleFavorite = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
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
    
    // Check if the star icon has the correct styling
    const starIcon = screen.getByTestId('star-icon');
    expect(starIcon).toHaveClass('text-yellow-400');
    expect(starIcon).toHaveClass('fill-yellow-400');
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
    
    // Check if the star icon has the correct styling
    const starIcon = screen.getByTestId('star-icon');
    expect(starIcon).toHaveClass('text-gray-400');
    expect(starIcon).not.toHaveClass('fill-yellow-400');
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