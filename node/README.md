# Node.js Application

This is a simple Node.js application using Express and MySQL.

## Environment Variables

`DATABASE_PASSWORD` - Database password for the MySQL database.
`DATABASE_USER` - Database user for the MySQL database.
`DATABASE_NAME` - Database name for the MySQL database.
`DATABASE_HOST` - Database host for the MySQL database.
`APP_PORT` - Port for the Node.js application. (3000)
`PROXY_PORT` - Port for the Nginx proxy. (80)
`LOCAL_PORT` - Local port for accessing the application (8080).
`APP_CONTAINER` - Name of the application container (app).
`NODE_ENV` - Node.js environment (development or production).

## Getting Started

1. Clone the repository
2. Create a `.env` file in the root directory and add the environment variables

   ```env
   DATABASE_PASSWORD=your_password
   DATABASE_USER=your_user
   DATABASE_NAME=your_database
   DATABASE_HOST=db
   APP_PORT=3000
   PROXY_PORT=80
   LOCAL_PORT=8080
   APP_CONTAINER=app
   NODE_ENV=development
   ```

3. Run `docker-compose up --build -d` to start the application
4. Access the application at `http://localhost:8080`
5. To stop the application, run `docker-compose down`
