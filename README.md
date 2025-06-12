**TEKNA.ROCKS Full-Stack Application**

This repository contains the full-stack test project for **TEKNA.ROCKS**, featuring a backend built with Node.js, Prisma, Express, PostgreSQL, and a frontend built with Angular 19.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Environment Variables](#environment-variables)
4. [Docker Setup](#docker-setup)

   * [Building and Running](#building-and-running)
5. [Application Usage](#application-usage)
6. [Database Migrations](#database-migrations)
7. [Cleaning Up](#cleaning-up)

---

## Prerequisites

* [Docker](https://www.docker.com/) (v20.10+)
* [Docker Compose](https://docs.docker.com/compose/) (v1.29+)
* [Node.js](https://nodejs.org/) (v22+) – for local development (optional)
* [Angular CLI](https://angular.io/cli) (v19+) – for local frontend commands (optional)

---

## Project Structure

```text
├── docker-compose.yml       # Docker Compose configuration
├── frontend-tekna/          # Angular 19 front-end application
│   ├── Dockerfile           # Frontend Dockerfile
│   ├── package.json         # Frontend dependencies
│   └── …                     # Angular app code
└── backend-tekna/           # Node.js + Prisma back-end application
    ├── Dockerfile           # Backend Dockerfile
    ├── prisma/              # Prisma schema & migrations
    ├── package.json         # Backend dependencies
    └── …                     # Express app code
```

---

## Environment Variables

All environment variables are defined in `docker-compose.yml`, but you can override them by creating `.env` files in each service directory.

| Variable           | Service  | Default                                                 | Description              |
| ------------------ | -------- | ------------------------------------------------------- | ------------------------ |
| POSTGRES\_DB       | postgres | `tekna_db`                                              | Database name            |
| POSTGRES\_USER     | postgres | `postgres`                                              | Database user            |
| POSTGRES\_PASSWORD | postgres | `postgres`                                              | Database password        |
| DATABASE\_URL      | backend  | `postgresql://postgres:postgres@postgres:5432/tekna_db` | Prisma connection string |

---

## Docker Setup

### Building and Running

From the project root, execute:

```bash
# Build and start all containers in detached mode
docker-compose up --build -d
```

This command will:

1. Pull the **PostgreSQL 17** image and start a container named `tekna_postgres`.
2. Build the **backend** image from `./backend-tekna/Dockerfile` and start `tekna_backend` on port `3000`.
3. Build the **frontend** image from `./frontend-tekna/Dockerfile` and start `tekna_frontend` on port `4200`.

To view real-time logs:

```bash
docker-compose logs -f
```

---

## Application Usage

* **Frontend (Angular)**:  [http://localhost:4200](http://localhost:4200)
  The Angular app runs in development mode by invoking `npm run local` inside the container.

* **Backend (Node.js/Express)**: [http://localhost:3000](http://localhost:3000)
  The Express server runs in development mode via `npm run dev`.

* **PostgreSQL Admin**: Connect using any client (e.g., pgAdmin, DBeaver) at `localhost:5432` with the credentials above.

---

## Database Migrations (Prisma)

To create or apply database migrations, open a shell in the backend container:

```bash
# Enter the backend container
docker-compose exec backend sh

# Inside the container, generate a new migration after changing Prisma schema
npx prisma migrate dev --name <migration_name>

# To apply existing migrations
npx prisma migrate deploy
```

---

## Cleaning Up

To stop and remove all containers, networks, and volumes created by this setup, run:

```bash
docker-compose down --volumes
```

---

**Happy coding with TEKNA.ROCKS!**
