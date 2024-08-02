# Medium Clone

A full-stack Medium clone built using TypeScript, PostgreSQL, Prisma, React, Express, and Node.js. This application mimics key features of Medium, including user authentication, article creation and management, and article interactions.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Initialize Prisma](#initialize-prisma)
- [Usage](#usage)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

## Features

- **User Authentication:** Secure login and registration with JWT-based authentication.
- **Article Creation:** Users can create and edit articles with rich text formatting.
- **Article Management:** Users can view, edit, and delete their articles.
- **Article Interactions:** Features such as liking articles, commenting, and following authors.
- **Responsive Design:** Optimized for various devices including mobile and desktop.

## Tech Stack

- **Frontend:** React, TypeScript
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma

## Getting Started

### Prerequisites

- Node.js (>= 16.0.0)
- PostgreSQL (>= 12.0)
- Yarn (optional but recommended)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/medium-clone.git
    ```

2. Navigate to the project directory:

    ```bash
    cd medium-clone
    ```

3. Install the dependencies:

    ```bash
    yarn install
    ```

    Or, if you prefer npm:

    ```bash
    npm install
    ```

4. Set up the database:

    - Make sure PostgreSQL is running and create a new database. Update the database connection settings in the `.env` file.

    `.env` example:

    ```env
    DATABASE_URL="postgres://username:password@host/db"
    ```

5. Run the Prisma migrations to set up the database schema:

    ```bash
    npx prisma migrate dev --name init_schema
    ```

6. Start the development server:

    ```bash
    yarn dev
    ```

    Or, if you prefer npm:

    ```bash
    npm run dev
    ```

### Initialize Prisma

1. Navigate to the backend folder:

    ```bash
    cd backend
    ```

2. Install Prisma:

    ```bash
    npm install prisma
    ```

3. Initialize Prisma:

    ```bash
    npx prisma init
    ```

4. Replace the `DATABASE_URL` in `.env` with your database connection URL:

    ```env
    DATABASE_URL="postgres://username:password@host/db"
    ```

5. Add the connection pool URL in `wrangler.toml`:

    ```toml
    name = "backend"
    compatibility_date = "2023-12-01"

    [vars]
    DATABASE_URL = "prisma://accelerate.prisma-data.net/?api_key=YOUR_API_KEY"
    ```

   💡 **Note:** You should not commit your production URL to GitHub. Use a local or development DB URL in `wrangler.toml` and ensure `.env` is in `.gitignore`.

6. Edit `prisma/schema.prisma` to define your database schema:



7. Migrate your database:

    ```bash
    npx prisma migrate dev --name init_schema
    ```

    💡 **Note:** If you encounter issues, try changing your Wi-Fi or network connection.

8. Generate the Prisma client:

    ```bash
    npx prisma generate --no-engine
    ```

9. Add the Accelerate extension:

    ```bash
    npm install @prisma/extension-accelerate
    ```

10. Initialize the Prisma client in your project:

    ```typescript
    import { PrismaClient } from '@prisma/client/edge'
    import { withAccelerate } from '@prisma/extension-accelerate'

    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends(withAccelerate())
    ```



## Configuration

Configuration options can be set in the `.env` file located in the root of the project. This includes settings for database connection, JWT secret, and other environment-specific variables.

## Troubleshooting

If you encounter any issues during installation or usage, please check the following:

- Ensure that PostgreSQL is running and the database connection settings in the `.env` file are correct.
- Check that all required dependencies are installed.
- Review the server logs for any error messages.

For further assistance, please open an issue on the GitHub repository.

## Contributors

We welcome contributions from the community! If you would like to contribute, please fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.
