import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { GitHubUser } from '../github-types';
import githubService, { githubQueryKeys } from '../services/github-api';

export const useGitHubUsers = <T = GitHubUser[]>(
  options?: UseQueryOptions<GitHubUser[], Error, T>
) => {
  const {
    data: users = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: githubQueryKeys.users(),
    queryFn: () => githubService.getUsers(),
    ...options,
    // GitHub users change infrequently, so we can set a longer staleTime
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    users,
    isLoading,
    error,
    refetch,
  };
};