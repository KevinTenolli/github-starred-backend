# Backend App Readme

## Description

This backend application serves as a proxy to save starred repositories and periodically collects commit count. It utilizes Docker for easy deployment and relies on environment variables specified in a `.env.development` file.

## Setup

To run the project, follow these instructions:

1. Create a `.env.development` file based on the provided `.env` template.

    ```bash
    cp .env .env.development
    ```

   Fill in the necessary values in the `.env.development` file.

2. Build and run the application using Docker Compose.

    ```bash
    docker-compose up -d --build
    ```

3. Migrate the database.

    ```bash
    npm run migration:run
    ```

This sets up the environment, builds the Docker containers, and migrates the database.



## Docker Compose

The provided `docker-compose.yml` file sets up the necessary containers for the application. The `-d` flag runs the containers in the background.

## Database Migration

To migrate the database, run the following command:

```bash
npm run migration:run
