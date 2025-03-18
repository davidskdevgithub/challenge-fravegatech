## Checks
- Configuration
  - [x] Create Next.js app
    - Typescript
    - Eslint
    - Tailwind CSS
    - Page router
  - [x] Push repo to GitHub
  - [x] Create a new project on Vercel
  - [x] Add secrets in GitHub
  - [x] Setup CI/CD
  - [x] Settings for VsCode
  - [x] Add new rules to ESLint
  - [x] Hostname for Next Images
  - [x] Vitest
  - [x] React Query
- Features
  - [x] get users
    - GitHub API to fetch -> URL_ADDRESS.github.com/users
  - [ ] get user detail
    - GitHub API to fetch -> URL_ADDRESS.github.com/users/{username}
  - [ ] implement search
    - Github API to fetch -> URL_ADDRESS.github.com/search/users?q={term}
    - use debounce or throttle
  - [ ] implement favorite
    - use localStorage
    - use debounce or throttle
- Components
  - [x] UserCard
    - name
    - avatar
    - link to detail page //TODO
    - favorite icon
  - [x] UserList
    - list of UserCard
  - [ ] SearchBar
    - input
    - button
  - [ ] FavoriteIcon
    - icon
    - click to toggle favorite
  - [ ] UserDetail
    - name
    - avatar
    - link to GitHub profile
    - favorite icon
    - bio
    - public repos
    - etc
- Take into account
  - [ ] home need to use csr
  - [ ] detail need to use ssr
  - [ ] loading state
  - [ ] error handling
  - [ ] responsive design
  - [ ] testing
  - [ ] performance

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.