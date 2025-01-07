# 🏗️ Infrastructure Template

This is an opinionated GitHub Repository Template for a full-stack web application

It sets up a Website, API, Database, Authentication (with Social Login), CI Pipeline, and hosting using Vercel and Supabase

There is support for developing locally using Docker, and the CI Pipeline provides a Test and Production environment

This is a starting point that you can use to focus on the specific details of the pages, endpoints, and database tables which are unique to your application.

## Tech Stack

| Feature          | Implementation    |
|------------------|-------------------|
| Website          | Next.js           |
| Styling          | Tailwind / ShadCN |
| API              | Next.js           |
| Authentication   | Supabase Auth     |
| Database         | Supabase Postgres |
| Unit tests       | Jest              |
| Acceptance Tests | Playwright        |
| CI pipeline      | GitHub Actions    |
| Hosting          | Vercel            |

## Design Philosophy

### Boring Technology

One of the main theme's of the technologies choices is to pick boring technology that is well understood, stable, predictable and has a large community.
This makes it easier for new developers to understand the codebase, and faster to solve problems when they arise.

### Free Tier / Scale to Zero

The hosting services have been chosen to keep costs as low and predictable as possible, to avoid any unexpected bills.

No credit card is required to get started, and the free tier should be sufficient for most small projects.

### Local Off-line Development

The development environment is configured to be as close to production as possible, while still being able to run on a local machine without needing an internet connection to run.

This also helps with trunk based development, as the more testing that can be done locally, the less likely it is that a bug will be introduced before merging into the main branch.
