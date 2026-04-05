# AE Website Backend

A clean and beginner-friendly backend setup using:
- TypeScript
- Express
- Prisma ORM
- PostgreSQL

## Folder Structure

```
backend/
  prisma/
    schema.prisma
  src/
    config/
      env.ts
      prisma-client.ts
    features/
      users/
        users.controller.ts
        users.routes.ts
        users.service.ts
    middlewares/
      error-handler.ts
      not-found.ts
    routes/
      index.ts
    app.ts
    server.ts
  .env.example
  package.json
  tsconfig.json
```

## Setup Steps

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.example .env
```

3. Update `.env` with your real PostgreSQL credentials.

4. Generate Prisma client:

```bash
npm run prisma:generate
```

5. Create tables in your database:

```bash
npm run db:push
```

6. Run the project in development:

```bash
npm run dev
```

## API Endpoints

- `GET /` - welcome message
- `GET /api/health` - health check
- `GET /api/users` - list users
- `POST /api/users` - create user (`name`, `email`)

## Naming Convention Used

- Folders: lowercase and clear names (`features`, `middlewares`, `config`)
- Files: kebab-case (`error-handler.ts`, `prisma-client.ts`)
- Code symbols: camelCase (`usersService`, `startServer`)
