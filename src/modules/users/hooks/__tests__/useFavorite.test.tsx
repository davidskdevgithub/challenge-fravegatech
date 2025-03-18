import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFavorite } from '../useFavorite';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

// Replace the real localStorage with our mock
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useFavorite', () => {
  beforeEach(() => {
    // Clear localStorage and reset mocks before each test
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('should initialize with non-favorite status when user is not in localStorage', () => {
    // Setup localStorage to return empty favorites
    localStorageMock.getItem.mockReturnValueOnce('{}');
    
    // Render the hook
    const { result } = renderHook(() => useFavorite('testuser'));
    
    // Check initial state
    expect(result.current.isFavorite).toBe(false);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('favorites');
  });

  it('should initialize with favorite status when user is in localStorage', () => {
    // Setup localStorage to return user as favorite
    localStorageMock.getItem.mockReturnValueOnce('{"testuser":true}');
    
    // Render the hook
    const { result } = renderHook(() => useFavorite('testuser'));
    
    // Check initial state
    expect(result.current.isFavorite).toBe(true);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('favorites');
  });

  it('should toggle favorite status from false to true', () => {
    // Setup localStorage to return empty favorites
    localStorageMock.getItem.mockReturnValueOnce('{}');
    // For the toggle call
    localStorageMock.getItem.mockReturnValueOnce('{}');
    
    // Render the hook
    const { result } = renderHook(() => useFavorite('testuser'));
    
    // Initial state should be non-favorite
    expect(result.current.isFavorite).toBe(false);
    
    // Toggle favorite status
    act(() => {
      result.current.toggleFavorite();
    });
    
    // Check that state was updated
    expect(result.current.isFavorite).toBe(true);
    
    // Check that localStorage was updated correctly
    expect(localStorageMock.setItem).toHaveBeenCalledWith('favorites', '{"testuser":true}');
  });

  it('should toggle favorite status from true to false', () => {
    // Setup localStorage to return user as favorite
    localStorageMock.getItem.mockReturnValueOnce('{"testuser":true}');
    // For the toggle call
    localStorageMock.getItem.mockReturnValueOnce('{"testuser":true}');
    
    // Render the hook
    const { result } = renderHook(() => useFavorite('testuser'));
    
    // Initial state should be favorite
    expect(result.current.isFavorite).toBe(true);
    
    // Toggle favorite status
    act(() => {
      result.current.toggleFavorite();
    });
    
    // Check that state was updated
    expect(result.current.isFavorite).toBe(false);
    
    // Check that localStorage was updated correctly
    expect(localStorageMock.setItem).toHaveBeenCalledWith('favorites', '{}');
  });

  it('should handle multiple users in favorites', () => {
    // Setup localStorage with multiple users
    localStorageMock.getItem.mockReturnValueOnce('{"user1":true,"user2":true}');
    // For the toggle call
    localStorageMock.getItem.mockReturnValueOnce('{"user1":true,"user2":true}');
    
    // Render the hook for a new user
    const { result } = renderHook(() => useFavorite('testuser'));
    
    // Initial state should be non-favorite
    expect(result.current.isFavorite).toBe(false);
    
    // Toggle favorite status
    act(() => {
      result.current.toggleFavorite();
    });
    
    // Check that state was updated
    expect(result.current.isFavorite).toBe(true);
    
    // Check that localStorage was updated correctly with all users
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'favorites', 
      '{"user1":true,"user2":true,"testuser":true}'
    );
  });

  it('should update when username prop changes', () => {
    // Setup localStorage with user1 as favorite
    localStorageMock.getItem.mockReturnValueOnce('{"user1":true}');
    
    // Render the hook with user1
    const { result, rerender } = renderHook(
      (props) => useFavorite(props), 
      { initialProps: 'user1' }
    );
    
    // Initial state should be favorite
    expect(result.current.isFavorite).toBe(true);
    
    // Setup localStorage for user2 check
    localStorageMock.getItem.mockReturnValueOnce('{"user1":true}');
    
    // Rerender with user2
    rerender('user2');
    
    // State should update to non-favorite
    expect(result.current.isFavorite).toBe(false);
  });
});