import { UserList } from '../components';

export default function UsersPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6" data-testid="page-title">
        GitHub Users
      </h1>
      <UserList />
    </main> 
  );
}