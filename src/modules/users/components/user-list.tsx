import React from 'react';
import { UserCard } from './user-card';
import { GitHubUser } from '../github-types';

interface UserListProps {
  users: GitHubUser[];
}

export const UserList: React.FC<UserListProps> = ({ users }) => {

  if (users.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No users found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
        />
      ))}
    </div>
  );
};