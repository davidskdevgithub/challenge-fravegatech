import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { githubQueryKeys } from '@/modules/users/services/github-api';
import githubService from '@/modules/users/services/github-api';
import UserDetailPage from '@/modules/users/pages/users-details-page';

interface UserDetailPageProps {
  username: string;
}

export default function UserDetailsWrapper({ username }: UserDetailPageProps) {
  return (
    <UserDetailPage username={username} />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.params as { username: string };
  const queryClient = new QueryClient();
  
  try {
    // Prefetch the user data on the server
    await queryClient.prefetchQuery({
      queryKey: githubQueryKeys.user(username),
      queryFn: () => githubService.getUserDetails(username),
    });
    
    return {
      props: {
        username,
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (error) {
    console.error('Error prefetching user data:', error);
    
    // Return not found if the user doesn't exist
    if ((error as Error).message.includes('404')) {
      return {
        notFound: true,
      };
    }
    
    // Return the username but with an empty state for other errors
    // The client-side will handle showing the error
    return {
      props: {
        username,
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
};