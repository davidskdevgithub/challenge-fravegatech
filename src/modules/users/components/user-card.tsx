import Image from 'next/image';
import Link from 'next/link';

import { GitHubUser } from '../github-types';
import { UserFavorite } from './user-favorite';

interface UserCardProps {
  user: GitHubUser;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {

  const { avatar_url, login: name } = user;

  return (
    <div 
      className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      data-testid="user-card"
    >
      <div className="p-4 flex items-center space-x-4">
        <Link href={`/users/${name}`} className="flex items-center space-x-4 flex-grow">
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              src={avatar_url}
              alt={`${name}'s avatar`}
              fill
              priority
              sizes="(max-width: 768px) 4rem, 4rem"
              className="rounded-full object-cover"
              data-testid="user-avatar"
            />
          </div>
          
          <div className="flex-grow">
            <h3 
              className="text-lg font-semibold text-gray-100"
              data-testid="user-name"
            >{name}</h3>
          </div>
        </Link>
        
        <UserFavorite username={name} />
      </div>
    </div>
  );
};