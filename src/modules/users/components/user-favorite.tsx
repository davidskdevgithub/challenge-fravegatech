import { useFavorite } from '../hooks/useFavorite';
import { Star } from 'lucide-react';

interface UserFavoriteProps {
  username: string;
  className?: string;
}

export const UserFavorite: React.FC<UserFavoriteProps> = ({ username, className = '' }) => {
  const { isFavorite, toggleFavorite } = useFavorite(username);

  return (
    <button 
      className={`p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors duration-200 ${className}`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      data-testid="favorite-button"
      onClick={toggleFavorite}
    >
      <Star
        className={`h-5 w-5 ${isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
        data-testid="star-icon"
      />
    </button>
  );
};