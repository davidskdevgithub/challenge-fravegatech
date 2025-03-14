import { UserList } from '../components';
import { mockUsers } from '../mocks/github-users-mock';

export default function UsersPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6" data-testid="page-title">
        GitHub Users
      </h1>
      <UserList users={mockUsers} />
    </main> 
  );
}