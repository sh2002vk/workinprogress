# Project Structure

This project is organized into several directories, each with a specific role in the application's architecture: \

Project \
|-- models/ (handles all interaction with sql -- use ORMs instead of raw SQL) \
|   &#x3000;-- student.js \
|   &#x3000;-- recruiter.js \
|   &#x3000;-- application.js \
|   &#x3000;-- job.js \
|   &#x3000;-- company.js \
|   &#x3000;-- index.js (admin file) \
|-- routes/ (api logic) \
|   &#x3000;-- accountRoutes.js \
|   &#x3000;-- applicationRoutes.js \
|-- controllers/ \
|   &#x3000;-- accountController.js \
|   &#x3000;-- applicationController.js \
-- server.js \
-- db_creation.js (used for creating tables in the DB, run with "node db_creation.js") 
-- database.js

.

# API Response Flow

The flow of a request through the API is as follows:

1. **Request Reaches Server**: The incoming request is first received by the server.
2. **Server to Controller**: The server then forwards the request to the appropriate controller.
3. **Controller to Model**: After authentication, the controller passes the request to the model.
4. **Model**: The model handles SQL interactions and implements the business logic, then returns the response back through the controller and server to the client.

# Local SQL Database Setup

1. Install MySQL on your machine.
2. Create a new database called "wipTest".
3. Set up your config vars in the ` .env ` file.
4. Run ` node db_creation.js ` to create the tables in the database.
5. OPTIONAL: use ```mysql -u root -p ``` to access the database and run ```show tables;``` to see the tables.
6. Run ` node server.js ` to start the server (``` npm start ``` also works)
7. Test the API using Postman or another API testing tool.

# Linter (used to verify promise handling in JS)
1. ` npm install eslint --save-dev `
2. ` npx eslint <filename>.js` to check a given file

