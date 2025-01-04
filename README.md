# Infrastructure Template

This is an opinionated GitHub repository template for a full-stack web application

It sets up a Website, API, Database, Authentication (with Social Login), CI pipeline, and hosting using Vercel and Supabase

There is support for developing locally using Docker, and the pipeline provides a Test and Production environment

With this in place you can focus on the domain specific details of the pages, endpoints, and database tables of the application

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

One of the main theme's of the technologies choices, is to pick boring technology that is well understood, stable, predictable and has a large community.
This makes it easier for new developers to understand the codebase, and faster to solve problems when they arise.

### Free Tier / Scale to Zero

The hosting services have been chosen to keep costs as low and predictable as possible. No credit card is required to get started, and the free tier should be sufficient for most small projects.

### Local Off-line Development

The development environment is setup to be as close to production as possible, while still being able to run on a local machine without needing an internet connection.
This also helps with using trunk based development, the more testing that can be done locally, the less likely it is that a bug will be introduced into the main branch.




