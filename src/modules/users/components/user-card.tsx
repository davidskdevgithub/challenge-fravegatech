import Image from 'next/image';

import { GitHubUser } from '../github-types';

interface UserCardProps {
  user: GitHubUser;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {

  const { avatar_url, login: name } = user;

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-4 flex items-center space-x-4">
        <div className="relative w-16 h-16 flex-shrink-0">
          <Image
            src={avatar_url}
            alt={`${name}'s avatar`}
            fill
            className="rounded-full object-cover"
          />
        </div>
        
        <div className="flex-grow">
          <h3 
            className="text-lg font-semibold text-gray-800"
          >{name}</h3>
        </div>
        
        <button 
          className="text-2xl focus:outline-none"
          aria-label="Add to favorites"
        >
          <span className="text-gray-300 hover:text-yellow-500">☆</span>
        </button>
      </div>
    </div>
  );
};