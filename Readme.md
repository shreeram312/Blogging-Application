Medium Clone
A full-stack Medium clone built using TypeScript, PostgreSQL, Prisma, React, Express, and Node.js. This application mimics key features of Medium, including user authentication, article creation and management, and article interactions.

Table of Contents
Features
Tech Stack
Getting Started
Prerequisites
Installation
Usage
Configuration
Troubleshooting
Contributors
License
Features
User Authentication: Secure login and registration with JWT-based authentication.
Article Creation: Users can create and edit articles with rich text formatting.
Article Management: Users can view, edit, and delete their articles.
Article Interactions: Features such as liking articles, commenting, and following authors.
Responsive Design: Optimized for various devices including mobile and desktop.
Tech Stack
Frontend: React, TypeScript
Backend: Node.js, Express, TypeScript
Database: PostgreSQL
ORM: Prisma
Getting Started
Prerequisites
Node.js (>= 16.0.0)
PostgreSQL (>= 12.0)
Yarn (optional but recommended)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/medium-clone.git
Navigate to the project directory:

bash
Copy code
cd medium-clone
Install the dependencies:

bash
Copy code
yarn install
Or, if you prefer npm:

bash
Copy code
npm install
Set up the database:

Make sure PostgreSQL is running and create a new database. Update the database connection settings in the .env file.

env
Copy code
DATABASE_URL="postgresql://username:password@localhost:5432/medium_clone"
Run the Prisma migrations to set up the database schema:

bash
Copy code
npx prisma migrate dev
Start the development server:

bash
Copy code
yarn dev
Or, if you prefer npm:

bash
Copy code
npm run dev
Usage
Once the server is running, you can access the application at http://localhost:3000. From there, you can register a new account, log in, and start creating and interacting with articles.

Configuration
Configuration options can be set in the .env file located in the root of the project. This includes settings for database connection, JWT secret, and other environment-specific variables.

Troubleshooting
If you encounter any issues during installation or usage, please check the following:

Ensure that PostgreSQL is running and the database connection settings in the .env file are correct.
Check that all required dependencies are installed.
Review the server logs for any error messages.
For further assistance, please open an issue on the GitHub repository.

Contributors
We welcome contributions from the community! If you would like to contribute, please fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

License
This project is licensed under the MIT License. See the LICENSE file for more details.







