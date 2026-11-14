# Threadly

Find your people. Follow your curiosity.

Threadly is a community discussion app where people can discover shared interests, join communities, and take part in conversations. This repository contains the React frontend, which connects to a separate Express API.

## Features

- Sign up, sign in, and sign out with JWT authentication.
- Browse communities and view their posts.
- Create communities, join or leave them, and manage communities you own.
- Create, edit, and delete your posts, with support for post images.
- Add comments and nested replies, and edit or delete your own comments.
- Upvote and downvote posts.
- Bookmark posts and revisit them from a dedicated page.
- Access a personal dashboard.
- Switch between light and dark themes, with your preference saved locally.

## Screenshots

Screenshots will be added here.

<!--
Save screenshots in docs/screenshots/ and uncomment these image links when ready.

### Home
![Threadly home page](docs/screenshots/home.png)

### Community
![Community details and posts](docs/screenshots/community.png)

### Post and comments
![Post details and threaded comments](docs/screenshots/post.png)
-->

## Tech stack

| Technology | Purpose |
| --- | --- |
| React 19 | Components and application state |
| Vite 8 | Development server and production builds |
| React Router 7 | Client-side routing |
| Axios | API requests |
| React Hot Toast | Notifications and confirmation prompts |
| CSS | Layout, styling, and themes |
| ESLint | Code linting |

## Getting started

### Prerequisites

- A Node.js version supported by the installed Vite release, and npm.
- A running Threadly backend with its database configured. The frontend needs the API for authentication, communities, posts, and other saved data.

### Installation

From the frontend repository root (the directory containing this README):

```sh
npm install
```

If you are working from the parent project folder, run `cd frontend` first.

### Environment variables

Create a `.env` file in the frontend root:

```env
VITE_BACK_END_SERVER_URL=http://localhost:3000
```

Use the base URL of your running backend. The local backend defaults to port `3000`; its routes do not use an `/api` prefix. Restart Vite after changing environment variables.

Variables prefixed with `VITE_` are exposed to the browser, so keep backend secrets out of this file.

### Run locally

```sh
npm run dev
```

Open the URL printed in the terminal, usually `http://localhost:5173`. Make sure the backend allows this frontend origin through its CORS configuration (`CLIENT_URL` in the companion backend).

To try the main flow, create an account, sign in, then create or join a community. Community membership is required to create posts and participate in comments and replies.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the frontend into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```text
frontend/
├── public/          # Favicon and theme initialization
├── src/
│   ├── assets/      # Shared image assets
│   ├── components/  # Navigation, layout, communities, posts, comments, and controls
│   ├── design/      # Styles for layouts, pages, and UI components
│   ├── pages/       # Authentication, dashboard, communities, posts, and bookmarks
│   ├── services/    # Axios client and API service functions
│   ├── App.jsx      # Routes and signed-in user state
│   ├── index.css    # Main stylesheet
│   └── main.jsx     # Application entry point
├── index.html
├── package.json
└── vite.config.js
```

## Main routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/sign-up` | Create an account |
| `/sign-in` | Sign in |
| `/dashboard` | Personal dashboard |
| `/communities` | Browse communities |
| `/communities/:communityId` | Community details and posts |
| `/communities/:communityId/edit` | Edit a community |
| `/communities/:communityId/posts/create` | Create a community post |
| `/posts` | Post feed |
| `/posts/:postId` | Post details and comments |
| `/posts/:postId/edit` | Edit a post |
| `/bookmarks` | Saved posts |

The dashboard, bookmarks, and creation/editing routes require sign-in. Community creation opens in a modal from the navigation or layout controls.

## Deployment

Set `VITE_BACK_END_SERVER_URL` to your deployed backend URL before running `npm run build`, then publish the generated `dist/` directory. Vite embeds the API URL at build time, so rebuild after changing it.

Configure your hosting provider to serve `index.html` for client-side routes so that refreshing a page such as `/communities/123` works. Update the backend's allowed frontend origin to match your deployed site.
