import { UserCard } from './user-card';
import { useGitHubUsers } from '../hooks/useGitHubUsers';

export const UserList: React.FC = () => {
  const { users, isLoading, error, refetch } = useGitHubUsers();

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" data-testid="loading-spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading users: {(error as Error).message}</p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => refetch()}
        >
          Retry
        </button>
      </div>
    );
  }

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