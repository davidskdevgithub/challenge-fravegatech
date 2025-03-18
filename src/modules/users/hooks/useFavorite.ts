import { useState, useEffect } from 'react';

export const useFavorite = (username: string) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Load favorite status from localStorage on component mount
  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
      setIsFavorite(!!favorites[username]);
    }
  }, [username]);
  
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    
    // Toggle favorite status
    const newFavoriteStatus = !isFavorite;
    
    if (newFavoriteStatus) {
      favorites[username] = true;
    } else {
      delete favorites[username];
    }
    
    // Save to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(newFavoriteStatus);
  };

  return { isFavorite, toggleFavorite };
};