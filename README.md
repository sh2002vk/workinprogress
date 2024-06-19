# WIP Engineering Principles

At WIP, we're building the future of internship recruiting. Our software is our core product. In order to have a cohesive product that is easy to debug, we aim to follow these principles:

1. Take `100% responsibility and ownership` over the code you write
2. Break up your code to be easily understandable
3. Label parts of your code and what they do through comments
4. Before you `push`, make sure to `pull` all of the latest changes and ensure that your component works with the old code
5. If you know of any problems that aren't urgent but need to be fixed, put them into `GitHub issues`
6. Use ChatGPT to speed up your development, but know all parts of the code you write 

# Routes 

 This will later be moved onto proper documentation. Refer to confluence for detailed information on inputs and outputs.

**/admin**
  - /currentApplicationQuota 

**/account_handling**
  - **/student**
    - /create
    - /update
    - /delete
    - /getQuota
  - **/recruiter**
    - /create
    - /update
    - /delete
  - **/company**
    - /create
    - /update
    - /delete

**/profile_handling**
  - **/student**
    - /getFullProfile
    - /getShortProfile
  - **/recruiter**
    - /getFullProfile
  - **/company**
    - /getFullProfile

**/actions**
  - **/student**
    - /getRecruiterContact
    - /getJobs
    - /getInterestedJobs
    - /bookmarkJob
    - /unbookmarkJob
    - /createApplication
    - /updateApplication
    - /submitApplication
    - /deleteApplication
    - /getApplications
  - **/recruiter**
    - /getStudents
    - /getShortlistedStudents
    - /bookmarkStudent
    - /shortlistStudent
    - /getJobPosting
    - /createJobPosting
    - /editJobPosting
    - /submitJobPosting
    - /deleteJobPosting
    - /getStudentsThatApplied
  - **/company**
    - /onboardRecruiter
    - /offboardRecruiter
    - /getRecruiter


# Project Structure

This project is organized into several directories, each with a specific role in the application's architecture: \

Project \
|-- models/ (handles all interaction with sql -- use ORMs instead of raw SQL) \
|   &#x3000;-- studentModel.js \
|   &#x3000;-- recruiterModel.js \
|   &#x3000;-- applicationModel.js \
|   &#x3000;-- jobModel.js \
|   &#x3000;-- companyModel.js \
|   &#x3000;-- index.js (admin file) \
|-- routes/ (api logic) \
|   &#x3000;-- accountRoutes.js \
|   &#x3000;-- recruiterRoutes.js \
|   &#x3000;-- studentRoutes.js \
|-- controllers/ \
|   &#x3000;-- accountController.js \
|   &#x3000;-- recruiterController.js \
|   &#x3000;-- studentController.js \
-- server.js \
-- db_creation.js (used for creating tables in the DB, run with "node db_creation.js") \
-- seed.js (used for creating sample data in the DB, run with "node seed.js") \
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

