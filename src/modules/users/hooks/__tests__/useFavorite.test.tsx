import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

// Mock the Zustand store
vi.mock('../../store/favoritesStore', () => {
  return {
    useFavoritesStore: vi.fn()
  };
});

// Import after mocking
import { useFavoritesStore } from '../../store/favoritesStore';
import { useFavorite } from '../useFavorite';

// Create mock functions after the vi.mock call
const mockIsFavorite = vi.fn();
const mockToggleFavorite = vi.fn();
    
// Setup getState mock with proper typing
type StoreType = {
  getState: ReturnType<typeof vi.fn>;
};

describe('useFavorite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup the mock implementation for useFavoritesStore
    (useFavoritesStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) => {
      if (selector) {
        return selector({
          isFavorite: mockIsFavorite,
          toggleFavorite: mockToggleFavorite
        });
      }
      return {
        isFavorite: mockIsFavorite,
        toggleFavorite: mockToggleFavorite
      };
    });
    
    // Mock the getState method
    ((useFavoritesStore as unknown) as StoreType).getState = vi.fn().mockReturnValue({
      toggleFavorite: mockToggleFavorite
    });
  });

  it('should initialize with non-favorite status when user is not in favorites', () => {
    // Set up the mock to return false for isFavorite
    mockIsFavorite.mockReturnValue(false);
    
    // Render the hook
    const { result } = renderHook(() => useFavorite('testuser'));
    
    // Check initial state
    expect(result.current.isFavorite).toBe(false);
    expect(mockIsFavorite).toHaveBeenCalledWith('testuser');
  });

  it('should initialize with favorite status when user is in favorites', () => {
    // Set up the mock to return true for isFavorite
    mockIsFavorite.mockReturnValue(true);
    
    // Render the hook
    const { result } = renderHook(() => useFavorite('testuser'));
    
    // Check initial state
    expect(result.current.isFavorite).toBe(true);
    expect(mockIsFavorite).toHaveBeenCalledWith('testuser');
  });

  it('should toggle favorite status from false to true', () => {
    // Set up the mock to return false for isFavorite initially
    mockIsFavorite.mockReturnValue(false);
    
    // Render the hook
    const { result } = renderHook(() => useFavorite('testuser'));
    
    // Initial state should be non-favorite
    expect(result.current.isFavorite).toBe(false);
    
    // Toggle favorite status
    act(() => {
      result.current.toggleFavorite();
    });
    
    // Check that toggleFavorite was called
    expect(mockToggleFavorite).toHaveBeenCalledWith('testuser');
  });

  it('should toggle favorite status from true to false', () => {
    // Set up the mock to return true for isFavorite initially
    mockIsFavorite.mockReturnValue(true);
    
    // Render the hook
    const { result } = renderHook(() => useFavorite('testuser'));
    
    // Initial state should be favorite
    expect(result.current.isFavorite).toBe(true);
    
    // Toggle favorite status
    act(() => {
      result.current.toggleFavorite();
    });
    
    // Check that toggleFavorite was called
    expect(mockToggleFavorite).toHaveBeenCalledWith('testuser');
  });

  it('should update when username prop changes', () => {
    // Set up the mock for user1
    mockIsFavorite.mockImplementation((username) => username === 'user1');
    
    // Render the hook with user1
    const { result, rerender } = renderHook(
      (props: string) => useFavorite(props), 
      { initialProps: 'user1' }
    );
    
    // Initial state should be favorite
    expect(result.current.isFavorite).toBe(true);
    
    // Rerender with user2
    rerender('user2');
    
    // State should update to non-favorite
    expect(mockIsFavorite).toHaveBeenCalledWith('user2');
  });
});