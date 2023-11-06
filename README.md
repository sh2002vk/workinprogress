# STRUCTURE: 

project/
|-- models/ (handles all interaction with sql -- use ORMs instead of raw SQL)
|   |-- student.js
|   |-- recruiter.js
|   `-- application.js
|-- routes/ (api logic)
|   |-- studentRoutes.js
|   |-- recruiterRoutes.js
|   `-- applicationRoutes.js
|-- controllers/ 
|   |-- studentController.js
|   |-- recruiterController.js
|   `-- applicationController.js
-- server.js
-- db_creation.js (used for creating tables in the DB, run with "node db_creation.js")


# API RESPONSE FLOW

request reaches server -> server sends request to controller -> controller authenticates and sends to model -> model deals with SQL and implements logic

