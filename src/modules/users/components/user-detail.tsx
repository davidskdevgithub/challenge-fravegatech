import React from 'react';
import Image from 'next/image';
import { GitHubUserDetail } from '../github-types';

interface UserDetailProps {
  user?: GitHubUserDetail;
}

export const UserDetail: React.FC<UserDetailProps> = ({ 
  user, 
}) => {

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">User not found</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="relative w-32 h-32 mb-4 md:mb-0 md:mr-6 flex-shrink-0">
            <Image
              src={user.avatar_url}
              alt={`${user.login}'s avatar`}
              fill
              className="rounded-full object-cover"
              data-testid="user-avatar"
            />
          </div>
          
          <div className="flex-grow text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-2">
              <h1 
                className="text-2xl font-bold text-gray-100"
                data-testid="user-name"
              >
                {user.login}
              </h1>
              <button 
                className="ml-4 text-2xl focus:outline-none"
                aria-label={'Add to favorites'}
                data-testid="favorite-button"
              >
                <span className={'text-gray-400 hover:text-yellow-500'}>
                  {'☆'}
                </span>
              </button>
            </div>
            
            <div className="text-gray-300 mb-2">
              <span className="text-gray-400">@{user.login}</span>
            </div>
            
            {user.bio && (
              <div className="text-gray-300 mb-3">
                {user.bio}
              </div>
            )}
            
            <div className="flex flex-wrap gap-4 mb-3">
              {user.company && (
                <div className="flex items-center text-gray-300">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 00-1-1H7a1 1 0 00-1 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                  {user.company}
                </div>
              )}
              
              {user.location && (
                <div className="flex items-center text-gray-300">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {user.location}
                </div>
              )}
              
              {user.blog && (
                <div className="flex items-center text-gray-300">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                  </svg>
                  <a 
                    href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {user.blog}
                  </a>
                </div>
              )}
              
              {user.twitter_username && (
                <div className="flex items-center text-gray-300">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
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
            
            <div className="text-gray-300">
              <a 
                href={user.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
                data-testid="github-link"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-700 rounded">
            <h2 className="font-semibold text-lg mb-2 text-gray-200">Profile Info</h2>
            <ul className="space-y-2 text-gray-300">
              <li>User ID: {user.id}</li>
              <li>Type: {user.type}</li>
              {user.site_admin && <li className="text-indigo-400 font-semibold">Site Admin</li>}
              <li>Public Repos: {user.public_repos}</li>
              <li>Public Gists: {user.public_gists}</li>
              <li>Followers: {user.followers}</li>
              <li>Following: {user.following}</li>
              <li>Created: {user.created_at && formatDate(user.created_at)}</li>
              <li>Updated: {user.updated_at && formatDate(user.updated_at)}</li>
            </ul>
          </div>
          
          <div className="p-4 bg-gray-700 rounded">
            <h2 className="font-semibold text-lg mb-2 text-gray-200">Links</h2>
            <ul className="space-y-2">
              <li>
                <a 
                  href={user.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Profile
                </a>
              </li>
              <li>
                <a 
                  href={`${user.html_url}?tab=repositories`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Repositories ({user.public_repos})
                </a>
              </li>
              <li>
                <a 
                  href={`${user.html_url}?tab=followers`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Followers ({user.followers})
                </a>
              </li>
              <li>
                <a 
                  href={`${user.html_url}?tab=following`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Following ({user.following})
                </a>
              </li>
              {user.public_gists > 0 && (
                <li>
                  <a 
                    href={`https://gist.github.com/${user.login}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    Gists ({user.public_gists})
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};