import React from 'react';
import Image from 'next/image';
import { Book, GitFork, Users, GitPullRequest, MapPin, Mail, AtSign } from 'lucide-react';
import { GitHubUser } from '../github-types';
import { UserFavorite } from './user-favorite';

interface UserDetailProps {
  user?: GitHubUser;
}

const calculateMembershipDuration = (createdAt: string): string => {
  const creationDate = new Date(createdAt);
  const currentDate = new Date();
  
  const yearDiff = currentDate.getFullYear() - creationDate.getFullYear();
  const monthDiff = currentDate.getMonth() - creationDate.getMonth();
  
  let years = yearDiff;
  let months = monthDiff;
  
  if (monthDiff < 0) {
    years--;
    months += 12;
  }
  
  const yearText = years === 1 ? 'year' : 'years';
  const monthText = months === 1 ? 'month' : 'months';
  
  if (years === 0) {
    return `${months} ${monthText}`;
  } else if (months === 0) {
    return `${years} ${yearText}`;
  } else {
    return `${years} ${yearText}, ${months} ${monthText}`;
  }
};

export const UserDetail: React.FC<UserDetailProps> = ({ user }) => {

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">User not found</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Left Column - Profile Info */}
      <div className="bg-gray-900 rounded-xl p-6 flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="relative w-40 h-40 mb-4 md:mb-0 md:mr-6">
            <Image
              src={user.avatar_url}
              alt={`${user.login}'s avatar`}
              fill
              priority
              sizes="(max-width: 768px) 8rem, 8rem"
              className="rounded-full object-cover border-4 border-gray-800"
              data-testid="user-avatar"
            />
          </div>
          <div className="absolute bottom-0 right-0 z-10">
            <UserFavorite username={user.login} className="ml-4" />
          </div>
        </div>

        <h1 
          className="text-3xl font-bold mb-1"
          data-testid="user-name"
        >
          {user.login}
        </h1>
        <p className="text-gray-400 mb-6">@{user.login}</p>
            
        {user.bio && (
          <p className="text-gray-300 mb-6">
            {user.bio}
          </p>
        )}

        <div className="relative w-full group mb-3">
          <a
            href={`https://github.com/${user.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 bg-gray-800 hover:bg-gray-750 rounded-lg transition-all duration-200 font-medium"
            data-testid="github-link"
          >
            View on GitHub
          </a>
          <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-lg"></div>
        </div>

        <div className="w-full space-y-2">
          {user.location && (
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <span>{user.location}</span>
            </div>
          )}
          
          {user.blog && (
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <a 
                href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                <span>{user.blog}</span>  
              </a>
            </div>
          )}
          
          {user.twitter_username && (
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                <AtSign className="h-5 w-5 text-gray-400" />
              </div>
              <a 
                href={`https://twitter.com/${user.twitter_username}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                @{user.twitter_username}
              </a>
            </div>
          )}
        </div>

      </div>

      {/* Right Column - Details */}
      <div className="md:col-span-2 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard icon={<Book className="h-6 w-6" />} value={user.public_repos} label="Repositories" url={`${user.html_url}?tab=repositories`}  />
          <StatCard icon={<GitFork className="h-6 w-6" />} value={user.public_gists} label="Gists" url={`https://gist.github.com/${user.login}`} />
          <StatCard icon={<Users className="h-6 w-6" />} value={user.followers} label="Followers" url={`${user.html_url}?tab=followers`}  />
          <StatCard icon={<GitPullRequest className="h-6 w-6" />} value={user.following} label="Following" url={`${user.html_url}?tab=following`} />
        </div>

        {/* Membership Info */}
        <div className="bg-gray-900 rounded-xl p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3">
              <div className="w-4 h-4 rounded-full border-2 border-purple-500"></div>
            </div>
            <h2 className="text-xl font-bold">
              GitHub member for {user.created_at ? calculateMembershipDuration(user.created_at) : 'unknown time'}
            </h2>
          </div>
        </div>

        {/* Organizations */}
        {user.company && (
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                <Users className="h-4 w-4 text-purple-500" />
              </div>
              <h2 className="text-xl font-bold">Organizations</h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {user.company.split(',').map((org) => (
                <a
                  key={org}
                  target='_blank'
                  href={`https://github.com/${org.replace('@', '')}`}
                  className="px-4 py-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-200"
                >
                  {org}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Simplified StatCard component
function StatCard({ icon, value, label, url }: { icon: React.ReactNode; value?: number | string; label: string; url: string }) {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="bg-gray-900 rounded-xl p-6 flex flex-col items-center justify-center group relative cursor-pointe"
    >
      <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-3 group-hover:bg-gradient-to-r from-purple-500 to-blue-500 transition-colors duration-300">
        <div className="text-purple-500 group-hover:text-white transition-colors duration-300">{icon}</div>
      </div>
      <span className="text-3xl font-bold">{value}</span>
      <span className="text-gray-400 text-sm">{label}</span>
    </a>
  );
}