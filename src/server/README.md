# Server Architecture (`src/server/`)

This directory houses the backend codebase for the Next.js full-stack application, ensuring proper separation of concerns using the **Repository-Service Pattern**.

## Structure

- **`auth/`**: Authentication config, password hashing, and session handlers.
- **`db/`**: Database client initialization (`prisma.ts` singleton).
- **`repositories/`**: Data access layer directly communicating with the database. Repositories should not include business logic.
- **`services/`**: Business logic layer orchestrating repositories and handling validation/data transformations.
- **`validators/`**: Zod validation schemas for safe incoming payload parsing.
- **`actions/`**: Server Actions which act as controller entrypoints for the application UI.

## Flow of Control
`Client UI / Component` -> `Server Action` or `API Route` -> `Service` (with validation) -> `Repository` -> `Database (Prisma)`
