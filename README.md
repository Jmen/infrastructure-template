# 🏗️ Infrastructure Template

This is an opinionated GitHub Repository Template for a full-stack web application, based around Supabase and Vercel

It sets up a Website, API, Database (with migrations), Authentication (with Social Login), CI Pipeline, and web hosting.

There is support for developing locally using Docker, and the CI Pipeline deploys to a Test and Production environment

This is a starting point that you can use to build the pages, endpoints, and database tables which are unique to your application.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Local Development](#local-development)
  - [CI Pipeline](#ci-pipeline)
  - [Google OAuth (optional)](#google-oauth)
- [Design Philosophy](#design-philosophy)
  - [Boring Technology](#boring-technology)
  - [Free Tier / Scale to Zero](#free-tier--scale-to-zero)
  - [Local Off-line Development](#local-off-line-development)

## Tech Stack

| Feature          | Implementation    |
| ---------------- | ----------------- |
| Website          | Next.js           |
| Styling          | Tailwind / ShadCN |
| API              | Next.js           |
| Authentication   | Supabase Auth     |
| Database         | Supabase Postgres |
| Unit tests       | Jest              |
| Acceptance Tests | Playwright        |
| CI pipeline      | GitHub Actions    |
| Hosting          | Vercel            |

## Installation

There are quite a few steps to get everything running, but this is because it is a full-stack application.

It takes about 5-10 minutes, and is a one-time setup

### Local Development

Click the "Use this template" button at the top of the GitHub page to create a new repository

Clone the new repository to your local machine

Run `npm install`

Copy the `.env.example` file to `.env.local` for Next.js

Copy the `lib/.env.example` file to `lib/.env.local` for Supabase

Run `npm run supabase:start`

Copy the "anon key" from the output, and put it into the `.env.local` file

Run `npm run dev`

Now you should be able to develop locally, and see the website at http://localhost:3000

### CI Pipeline

Create a Vercel account

Run `npx vercel login`

Run `npx vercel link`, don't link to an existing project, setup a new project for the Test environment

Rename `.vercel/project.json` to `project-test.json`

Run `npx vercel link`, don't link to an existing project, setup a new project for the Production environment

Rename `.vercel/project.json` to `project-production.json`

Sign up to Supabase and create two projects, for Test and Production

In Vercel add the following environment variables to both Test and Production projects

- `NEXT_PUBLIC_SUPABASE_URL` - found in Supabase->Project Settings->API
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - found in Supabase->Project Settings->API

In GitHub goto the repository Settings->Secrets->Actions and add the following

- `VERCEL_TOKEN` - generated from Vercel - [Account Settings → Tokens](https://vercel.com/account/tokens)
- `VERCEL_ORG_ID` - found in either `.vercel/project-test|production.json` (both have the same value)
- `SUPABASE_ACCESS_TOKEN` - generated from Supabase - [Dashboard->Account-Access Tokens](https://supabase.com/dashboard/account/tokens)

Create two Environments in GitHub called `Test` and `Production`
(Free GitHub plans can not use Environments unless the repository is Public)

Setup these secrets for the Test and Production environments

- `VERCEL_PROJECT_ID` - found in `.vercel/project-test|production.json` (different values for each)
- `SUPABASE_PROJECT_ID` - Supabase->Project Settings->General
- `SUPABASE_DB_PASSWORD` - can be reset from Supabase->Project Settings->Database if forgotten

Now you should be able to push to the main branch, see the CI Pipeline run, and deploy to the environments

### Google OAuth (Optional)

#### Local Development

To enable Google OAuth, create a GCP account - https://console.cloud.google.com/

Create 3 Projects, one for Local, Test, and Production

Search for "Google OAuth Platform" and then select "Clients"

Create a new Client as a "Web Application"

Set the "Authorized redirect URI" to ${BASE_URL}/auth/v1/callback (either localhost or the Vercel deploy URL)

Save and go back into the Client and you will see the "Client ID" and "Client Secret"

Set the following environment variables in the `.env.local` file

- `USE_GOOGLE_AUTH=true`

Set the credentials in the `lib/.env.local` file for Supabase

- `GOOGLE_CLIENT_ID=your-id`
- `GOOGLE_CLIENT_SECRET=your-secret`

Restart the Supabase Docker container `npm run supabase:stop && npm run supabase:start`

You should now be able to login with Google on the local development environment

#### CI Pipeline

In the Supabase Dashboard, for each project go to the Project Settings->Authentications->Providers

Enable Google, and set the "Client ID" and "Client Secret" from the GCP project

You should now be able to login with Google on the Test and Production environments

## Design Philosophy

### Boring Technology

One of the main themes behind the framework and service choices is to pick boring technology that is well understood, stable, predictable and has a large community.

This makes it easier to understand the codebase, and faster to find solutions to common problems.

### Free Tier / Scale to Zero

The hosting services have been chosen to keep costs as low and predictable as possible, and to avoid any unexpected bills.

No credit card is required to get started, and the free tier should be sufficient for most small projects.

### Local Off-line Development

The development environment is configured to be as close to production as possible, while still being able to run on a local machine without needing an internet connection.

This also helps with trunk based development, as the more testing that can be done locally, the less likely it is that a bug will be introduced before pushing to the main branch.
