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

