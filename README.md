# Quiz Builder

A full-stack app for creating and taking quizzes. Supports three question types: boolean (yes/no), free-text input, and multi-select checkbox.

## Tech stack

### Backend
| | |
|---|---|
| Runtime | Node.js 22 |
| Framework | NestJS 11 |
| Language | TypeScript 5 |
| ORM | Prisma 7 |
| Database | PostgreSQL 15 |
| Validation | class-validator / class-transformer |
| API docs | Swagger (OpenAPI 3) |

### Frontend
| | |
|---|---|
| Framework | Next.js 16 (Pages Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Forms | React Hook Form + Zod |

### Infrastructure
| | |
|---|---|
| Containerisation | Docker + Docker Compose |

---

## API endpoints

Base URL: `http://localhost:3000`
Interactive docs: `http://localhost:3000/api`

### Quizzes

| Method | Path | Description | Body | Response |
|---|---|---|---|---|
| `GET` | `/quizzes` | List all quizzes | — | `QuizSummary[]` |
| `GET` | `/quizzes/:id` | Get quiz by ID | — | `QuizDetail` |
| `POST` | `/quizzes` | Create a quiz | `CreateQuizDto` | `QuizDetail` |
| `DELETE` | `/quizzes/:id` | Delete a quiz | — | `204 No Content` |

**Question types**

| Type | `options` | Description |
|---|---|---|
| `BOOLEAN` | `[]` | Yes / No question |
| `INPUT` | `[]` | Free-text answer |
| `CHECKBOX` | `["A", "B", ...]` | Multi-select; at least one option required |

---

## Frontend pages

| Route | Description |
|---|---|
| `/` | Home / landing page |
| `/quizzes` | List of all quizzes |
| `/quizzes/:id` | Take a specific quiz |
| `/create` | Create a new quiz |

---

## Prerequisites

- Node.js 22+
- Docker & Docker Compose

## Run with Docker (recommended)

```bash
cp .env.example .env
docker compose up --build
```

- **Frontend**: http://localhost:4000
- **Backend API**: http://localhost:3000
- **Swagger**: http://localhost:3000/api

All three services start together. The backend automatically runs database migrations on startup.

---

## Local development (without Docker)

### 1. Start the database

```bash
docker compose up db -d
```

### 2. Backend

```bash
cd backend
cp .env.example .env
pnpm install
pnpm prisma:migrate
pnpm start:dev
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend reads `NEXT_PUBLIC_API_URL` from the environment. Create `frontend/.env.local` to override it:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## Environment variables

| Variable | Default | Description |
|---|---|---|
| `POSTGRES_USER` | `postgres` | Database user |
| `POSTGRES_PASSWORD` | `postgres` | Database password |
| `POSTGRES_DB` | `quizbuilder` | Database name |
| `NEXT_PUBLIC_API_URL` | `http://localhost:3000` | Backend URL (baked into frontend at build time) |
