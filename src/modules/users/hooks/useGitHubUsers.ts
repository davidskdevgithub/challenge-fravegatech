import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { GitHubUser } from '../github-types';
import githubService, { githubQueryKeys } from '../services/github-api';

export const useGitHubUsers = <T = GitHubUser[]>(
  query: string,
  options?: UseQueryOptions<GitHubUser[], Error, T>
) => {

  const { queryKey, queryFn } = query.length > 0 ? {
    queryKey: githubQueryKeys.searchUsers(query),
    queryFn: () => githubService.searchUsers(query),
  } : {
    queryKey: githubQueryKeys.users(),
    queryFn: () => githubService.getUsers(),
  };

  const {
    data: users = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey,
    queryFn,
    ...options,
  });

  return {
    users,
    isLoading,
    error,
    refetch,
  };
};