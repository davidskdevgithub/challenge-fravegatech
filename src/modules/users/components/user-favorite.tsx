import { useFavorite } from '../hooks/useFavorite';

interface UserFavoriteProps {
  username: string;
  className?: string;
}

export const UserFavorite: React.FC<UserFavoriteProps> = ({ username, className = '' }) => {
  const { isFavorite, toggleFavorite } = useFavorite(username);

  return (
    <button 
      className={`text-2xl focus:outline-none ${className}`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      data-testid="favorite-button"
      onClick={toggleFavorite}
    >
      <span className={`${isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}>
        {isFavorite ? '★' : '☆'}
      </span>
    </button>
  );
};