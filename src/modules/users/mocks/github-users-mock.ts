import { GitHubUser } from '../github-types';

export const mockUsers: GitHubUser[] = [
  {
    'login': 'mojombo',
    'id': 1,
    'node_id': 'MDQ6VXNlcjE=',
    'avatar_url': 'https://avatars.githubusercontent.com/u/1?v=4',
    'gravatar_id': '',
    'url': 'https://api.github.com/users/mojombo',
    'html_url': 'https://github.com/mojombo',
    'followers_url': 'https://api.github.com/users/mojombo/followers',
    'following_url': 'https://api.github.com/users/mojombo/following{/other_user}',
    'gists_url': 'https://api.github.com/users/mojombo/gists{/gist_id}',
    'starred_url': 'https://api.github.com/users/mojombo/starred{/owner}{/repo}',
    'subscriptions_url': 'https://api.github.com/users/mojombo/subscriptions',
    'organizations_url': 'https://api.github.com/users/mojombo/orgs',
    'repos_url': 'https://api.github.com/users/mojombo/repos',
    'events_url': 'https://api.github.com/users/mojombo/events{/privacy}',
    'received_events_url': 'https://api.github.com/users/mojombo/received_events',
    'type': 'User',
    'user_view_type': 'public',
    'site_admin': false
  },
  {
    'login': 'defunkt',
    'id': 2,
    'node_id': 'MDQ6VXNlcjI=',
    'avatar_url': 'https://avatars.githubusercontent.com/u/2?v=4',
    'gravatar_id': '',
    'url': 'https://api.github.com/users/defunkt',
    'html_url': 'https://github.com/defunkt',
    'followers_url': 'https://api.github.com/users/defunkt/followers',
    'following_url': 'https://api.github.com/users/defunkt/following{/other_user}',
    'gists_url': 'https://api.github.com/users/defunkt/gists{/gist_id}',
    'starred_url': 'https://api.github.com/users/defunkt/starred{/owner}{/repo}',
    'subscriptions_url': 'https://api.github.com/users/defunkt/subscriptions',
    'organizations_url': 'https://api.github.com/users/defunkt/orgs',
    'repos_url': 'https://api.github.com/users/defunkt/repos',
    'events_url': 'https://api.github.com/users/defunkt/events{/privacy}',
    'received_events_url': 'https://api.github.com/users/defunkt/received_events',
    'type': 'User',
    'user_view_type': 'public',
    'site_admin': false
  },
  {
    'login': 'pjhyett',
    'id': 3,
    'node_id': 'MDQ6VXNlcjM=',
    'avatar_url': 'https://avatars.githubusercontent.com/u/3?v=4',
    'gravatar_id': '',
    'url': 'https://api.github.com/users/pjhyett',
    'html_url': 'https://github.com/pjhyett',
    'followers_url': 'https://api.github.com/users/pjhyett/followers',
    'following_url': 'https://api.github.com/users/pjhyett/following{/other_user}',
    'gists_url': 'https://api.github.com/users/pjhyett/gists{/gist_id}',
    'starred_url': 'https://api.github.com/users/pjhyett/starred{/owner}{/repo}',
    'subscriptions_url': 'https://api.github.com/users/pjhyett/subscriptions',
    'organizations_url': 'https://api.github.com/users/pjhyett/orgs',
    'repos_url': 'https://api.github.com/users/pjhyett/repos',
    'events_url': 'https://api.github.com/users/pjhyett/events{/privacy}',
    'received_events_url': 'https://api.github.com/users/pjhyett/received_events',
    'type': 'User',
    'user_view_type': 'public',
    'site_admin': false
  }
];

export const mockUserDetail: GitHubUser = {
  login: 'testuser',
  id: 1,
  node_id: 'MDQ6VXNlcjE=',
  avatar_url: 'https://example.com/avatar.png',
  gravatar_id: '',
  url: 'https://api.github.com/users/testuser',
  html_url: 'https://github.com/testuser',
  followers_url: 'https://api.github.com/users/testuser/followers',
  following_url: 'https://api.github.com/users/testuser/following{/other_user}',
  gists_url: 'https://api.github.com/users/testuser/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/testuser/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/testuser/subscriptions',
  organizations_url: 'https://api.github.com/users/testuser/orgs',
  repos_url: 'https://api.github.com/users/testuser/repos',
  events_url: 'https://api.github.com/users/testuser/events{/privacy}',
  received_events_url: 'https://api.github.com/users/testuser/received_events',
  type: 'User',
  user_view_type: 'public',
  site_admin: false,
  name: 'Test User',
  company: 'Test Company',
  blog: 'https://testuser.dev',
  location: 'Test City',
  email: 'test@example.com',
  hireable: true,
  bio: 'A test user',
  twitter_username: 'testuser',
  public_repos: 30,
  public_gists: 15,
  followers: 100,
  following: 50,
  created_at: '2011-01-25T18:44:36Z',
  updated_at: '2023-01-25T18:44:36Z'
};