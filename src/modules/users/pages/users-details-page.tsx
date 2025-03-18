import Link from 'next/link';
import { UserDetail } from '../components/user-detail';
import { useGitHubUserDetails } from '../hooks/useGitHubUserDetails';

interface UserDetailPageProps {
  username: string;
}

export default function UserDetailPage({ username }: UserDetailPageProps) {
  const { user } = useGitHubUserDetails(username);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-block mb-6 text-blue-500 hover:underline">
        &larr; Back to users
      </Link>
      
      <UserDetail 
        user={user} 
      />
    </div>
  );
}