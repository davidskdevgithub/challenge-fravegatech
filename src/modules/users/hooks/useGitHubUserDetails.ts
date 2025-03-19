import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { GitHubUser } from '../github-types';
import githubService, { githubQueryKeys } from '../services/github-api';

export const useGitHubUserDetails = <T = GitHubUser>(
  username: string,
  options?: Partial<UseQueryOptions<GitHubUser, Error, T>>
) => {
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: githubQueryKeys.user(username),
    queryFn: () => githubService.getUserDetails(username),
    // Don't fetch if username is empty
    enabled: !!username,
    ...options,
  });

  return {
    user,
    isLoading,
    error,
    refetch,
  };
};