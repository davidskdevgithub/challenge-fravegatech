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
      className="relative bg-gray-900 rounded-xl overflow-hidden group"
      data-testid="user-card"
    >
      <div className="absolute top-3 right-3 z-10">
        <UserFavorite username={name} />
      </div>
      <Link href={`/users/${name}`} className="flex flex-col items-stretch">
        <div className="p-6">
          <div className="flex flex-col items-center text-center">
              <div className="relative w-24 h-24 mb-4">
                <Image
                  src={avatar_url || '/placeholder.svg'}
                  alt={`${name}'s avatar`}
                  fill
                  priority
                  sizes="(max-width: 768px) 6rem, 6rem"
                  className="rounded-full object-cover border-4 border-gray-800 group-hover:border-purple-500 transition-all duration-300"
                  data-testid="user-avatar"
                />
              </div>

              <h3 
                className="text-xl font-semibold mb-2"
                data-testid="user-name"
              >{name}</h3>
          </div>
        </div>
      </Link>

      <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
};