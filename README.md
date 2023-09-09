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

- To run the app in development mode, use: `npm run dev`.
- To run the app in production mode, use: `npm run start`.
- to run make a migration use: `npm run db:generate`.
- to run make a push the migration to db use: `npm run db:push`.

## NOTE

I build this project to challenge myself and add new Feature and didn't build it the project include

- Authentication With jsonWebToken(JWT)
- searching
- push notifications `soon`

## Code Structure

- `app.ts`: The entry point of the application
- `db/DBClient.ts`: To connect DrizzleORM with PostgreSQL.
- `db/migrate`: this file to make drizzle make the migration in to the DB and apply the schema
- `schema`: This folder to handle GraphQL types
- `resolver`: This folder defines the functions that fetch data for a single field in a GraphQL schema.
- `decorator/AuthChecker.ts`: This function is responsible to verify the Auth token
- `inputs`: This folder defines the arguments for fields in a GraphQL schema.

to use the all queries must be authenticate with the user token add this token in Authorization header

## Contact Information

If you have any questions or feedback, please feel free to reach out to me on LinkedIn or via email.
