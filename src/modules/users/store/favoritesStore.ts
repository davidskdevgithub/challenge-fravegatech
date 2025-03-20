import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favorites: Record<string, boolean>;
  toggleFavorite: (username: string) => void;
  isFavorite: (username: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: {},
        
      toggleFavorite: (username) => {
        set((state) => {
          const newFavorites = { ...state.favorites };
          if (newFavorites[username]) {
            delete newFavorites[username];
          } else {
            newFavorites[username] = true;
          }
          return { favorites: newFavorites };
        });
      },
      
      isFavorite: (username) => !!get().favorites[username],
    }),
    {
      name: 'favorites-storage',
    }
  )
);