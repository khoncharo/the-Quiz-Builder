# Quiz Builder

## Prerequisites

- Node.js 18+
- Docker

## Start the database

```bash
docker compose up -d
```

## Backend setup

```bash
cd backend
cp .env.example .env
npm install
npx prisma migrate dev --name init
npx prisma generate
npm run start:dev
```

## Frontend setup

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

## URLs

- **Frontend**: http://localhost:4000
- **Backend**: http://localhost:3000

## Create a sample quiz

```bash
curl -X POST http://localhost:3000/quizzes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sample Quiz",
    "questions": [
      {
        "type": "BOOLEAN",
        "label": "Is the sky blue?",
        "options": []
      },
      {
        "type": "INPUT",
        "label": "What is your name?",
        "options": []
      },
      {
        "type": "CHECKBOX",
        "label": "Pick your favorite colors",
        "options": ["Red", "Green", "Blue"]
      }
    ]
  }'
```
