# O-Task

an Task manger implemented using The newest technologies in the industry

## Technologies Used

- `TypeScript`
- `TypeGraphQL`
- `DrizzleORM`
- `PostgreSQL`

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Installation

1. Clone the repo to your local machine: `git clone https://github.com/omarsabra1/O-Task.git `.

2. Install the dependencies using NPM: ` cd O-Task`

3. Install the necessary dependencies: `npm install`.

## Running the Application
To run the application:


- In production mode: `npm run start`.
- In development mode: `npm run dev`.

To create a migration:

- To create a migration: `npm run db:generate`.
- To apply the migration to the database: `npm run db:push`.

## Note

I developed this project to challenge myself and add new features. The project includes the following:

- Authentication with JSON Web Token (JWT).
- Search functionality.
- Push notifications (coming soon).

To learn more about the schema, you can refer to [SCHEMA](O-task.graphql).

## Code Structure

- **app.ts:** The entry point of the application.
- **db/DBClient.ts:** Used to connect DrizzleORM with PostgreSQL.
- **db/migrate:** This directory contains files for managing database migrations.
- **schema:** Handles GraphQL types.
- **resolver:** Defines the functions that fetch data for a single field in a GraphQL schema.
- **decorator/AuthChecker.ts:** Responsible for verifying the authentication token.
- **inputs:** Defines the arguments for fields in a GraphQL schema.

To use all queries, you must authenticate with a user token. Add this token from the `signIn` mutation in the `Authorization` header with the type `Bearer Token`.


## Contact Information

If you have any questions or feedback, please feel free to reach out to me on [LinkedIn](https://www.linkedin.com/in/the-sabra/) or via [email](omarsabra509@gmail.com).
 