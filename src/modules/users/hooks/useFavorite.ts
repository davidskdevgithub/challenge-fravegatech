import { useCallback } from 'react';
import { useFavoritesStore } from '../store/favoritesStore';

export const useFavorite = (username: string) => {
  const isFavorite = useFavoritesStore(state => state.isFavorite(username));
  
  const toggleFavorite = useCallback(() => {
    useFavoritesStore.getState().toggleFavorite(username);
  }, [username]);

  return { isFavorite, toggleFavorite };
};