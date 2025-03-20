import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { UserDetail } from '../components/user-detail';
import { useGitHubUserDetails } from '../hooks/useGitHubUserDetails';

interface UserDetailPageProps {
  username: string;
}

export default function UserDetailPage({ username }: UserDetailPageProps) {
  const { user, isLoading, error, refetch } = useGitHubUserDetails(username);

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <div 
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
          data-testid="loading-spinner" 
          role="status"
          aria-label="Loading"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">Error loading user details: {error.message}</p>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => refetch()}
        >
          Retry
        </button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft className="h-5 w-5 mr-2" />
        <span>Back to users</span>
      </Link>
      
      <UserDetail 
        user={user} 
      />
    </div>
  );
}