delete require.cache[require.resolve('dotenv/config')];
require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432,
    ssl: {
      rejectUnauthorized: false, // Set to false if using self-signed certificates
    },
  });

client.connect(err => {
  if (err) {
    console.error('Error connecting to the PostgreSQL server:', err);
    process.exit(1);
  }
  console.log("Connected to the PostgreSQL server.");

  const createCompanyTable = `
    CREATE TABLE IF NOT EXISTS COMPANY (
      "CompanyID" SERIAL PRIMARY KEY,
      "Name" VARCHAR(255) NOT NULL,
      "Industry" VARCHAR(255) NOT NULL,
      "ContactEmail" VARCHAR(255) UNIQUE
    );`;

  const createJobTable = `
    CREATE TABLE IF NOT EXISTS JOB (
      "JobID" SERIAL PRIMARY KEY,
      "RecruiterID" VARCHAR(255) NOT NULL,
      "CompanyID" INT NOT NULL,
      "Type" TEXT,  -- Use TEXT for ENUM equivalent
      "Role" VARCHAR(255),
      "Location" VARCHAR(255),
      "DatePosted" DATE NOT NULL,
      "DateClosed" DATE,
      "Experience" FLOAT,
      "Pay" FLOAT,
      "Environment" TEXT,  -- Use TEXT for ENUM equivalent
      "Duration" TEXT,     -- Use TEXT for ENUM equivalent
      "Terms" JSONB,       -- Use JSONB for JSON fields in PostgreSQL
      "Industry" VARCHAR(255),
      "JobDescription" TEXT,
      "JobQualification" TEXT,
      "Status" TEXT NOT NULL,  -- Use TEXT for ENUM equivalent
      "RequiredDocuments" JSONB,
      "Season" TEXT,           -- Use TEXT for ENUM equivalent
      FOREIGN KEY ("CompanyID") REFERENCES COMPANY("CompanyID") ON DELETE CASCADE,
      FOREIGN KEY ("RecruiterID") REFERENCES RECRUITER("RecruiterID") ON DELETE CASCADE
    );`;

  const createStudentTable = `
    CREATE TABLE IF NOT EXISTS STUDENT (
      "StudentID" VARCHAR(255) PRIMARY KEY,
      "FirstName" VARCHAR(100) NOT NULL,
      "LastName" VARCHAR(100) NOT NULL,
      "School" VARCHAR(255) NOT NULL,
      "EmailID" VARCHAR(255) NOT NULL UNIQUE,
      "AcademicYear" INT NOT NULL,
      "Age" INT,
      "ResumeLink" TEXT,
      "AcademicMajor" VARCHAR(100) NOT NULL,
      "GPA" DECIMAL(3, 2),
      "WorkExperience" JSONB,
      "PersonalStatement" TEXT,
      "Experience" FLOAT,
      "Quota" INT NOT NULL,
      "Preference" TEXT,  -- Use TEXT for ENUM equivalent
      "Interest" JSONB,
      "Skills" JSONB,
      "Duration" TEXT,    -- Use TEXT for ENUM equivalent
      "Season" TEXT,      -- Use TEXT for ENUM equivalent
      "Location" VARCHAR(100),
      "Photo" TEXT
    );`;

  const createRecruiterTable = `
    CREATE TABLE IF NOT EXISTS RECRUITER (
      "RecruiterID" VARCHAR(255) PRIMARY KEY,
      "FirstName" VARCHAR(100) NOT NULL,
      "LastName" VARCHAR(100) NOT NULL,
      "CompanyID" INT NOT NULL,
      "EmailID" VARCHAR(255) NOT NULL UNIQUE,
      "CompanyName" VARCHAR(255) NOT NULL,
      "Roles" TEXT NOT NULL,
      "PhoneNumber" VARCHAR(20),
      "LinkedInProfile" VARCHAR(255),
      "Locations" TEXT,
      FOREIGN KEY ("CompanyID") REFERENCES COMPANY("CompanyID") ON DELETE CASCADE
    );`;

  const createApplicationTable = `
    CREATE TABLE IF NOT EXISTS APPLICATION (
      "ApplicationID" SERIAL PRIMARY KEY,
      "JobID" INT NOT NULL,
      "StudentID" VARCHAR(255) NOT NULL,
      "RecruiterID" VARCHAR(255),
      "ApplicationTime" DATE NOT NULL,
      "Status" TEXT NOT NULL,  -- Use TEXT for ENUM equivalent
      "SubmittedDocuments" JSONB,
      FOREIGN KEY ("JobID") REFERENCES JOB("JobID") ON DELETE CASCADE,
      FOREIGN KEY ("StudentID") REFERENCES STUDENT("StudentID") ON DELETE CASCADE,
      FOREIGN KEY ("RecruiterID") REFERENCES RECRUITER("RecruiterID") ON DELETE CASCADE
    );`;

  const createBookmarkTable = `
    CREATE TABLE IF NOT EXISTS BOOKMARK (
      "JobID" INT,
      "StudentID" VARCHAR(255) NOT NULL,
      "RecruiterID" VARCHAR(255) NOT NULL,
      "Direction" TEXT NOT NULL,  -- Use TEXT for ENUM equivalent
      PRIMARY KEY ("StudentID", "RecruiterID", "Direction"),
      FOREIGN KEY ("JobID") REFERENCES JOB("JobID") ON DELETE CASCADE,
      FOREIGN KEY ("StudentID") REFERENCES STUDENT("StudentID") ON DELETE CASCADE,
      FOREIGN KEY ("RecruiterID") REFERENCES RECRUITER("RecruiterID") ON DELETE CASCADE
    );`;

  const createShortlistTable = `
    CREATE TABLE IF NOT EXISTS SHORTLIST (
      "ShortlistID" SERIAL PRIMARY KEY,
      "StudentID" VARCHAR(255) NOT NULL,
      "JobID" INT NOT NULL,
      "RecruiterID" VARCHAR(255) NOT NULL,
      FOREIGN KEY ("StudentID") REFERENCES STUDENT("StudentID") ON DELETE CASCADE,
      FOREIGN KEY ("JobID") REFERENCES JOB("JobID") ON DELETE CASCADE,
      FOREIGN KEY ("RecruiterID") REFERENCES RECRUITER("RecruiterID") ON DELETE CASCADE
    );`;

  const createVerificationCodesTable = `
    CREATE TABLE IF NOT EXISTS VERIFICATION (
      "EmailID" VARCHAR(255) PRIMARY KEY,
      "Code" VARCHAR(6) NOT NULL,
      "CreatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

  // Table creation execution
  client.query(createCompanyTable, (err) => {
    if (err) {
      console.error("Error creating Company table:", err);
      return client.end();
    }
    console.log("COMPANY table created or exists already!");

    client.query(createRecruiterTable, (err) => {
      if (err) {
        console.error("Error creating Recruiter table:", err);
        return client.end();
      }
      console.log("RECRUITER table created or exists already!");

      client.query(createStudentTable, (err) => {
        if (err) {
          console.error("Error creating STUDENT table:", err);
          return client.end();
        }
        console.log("STUDENT table created or exists already!");

        client.query(createJobTable, (err) => {
          if (err) {
            console.error("Error creating JOB table:", err);
            return client.end();
          }
          console.log("JOB table created or exists already!");

          client.query(createBookmarkTable, (err) => {
            if (err) {
              console.error("Error creating BOOKMARK table:", err);
              return client.end();
            }
            console.log("BOOKMARK table created or exists already!");

            client.query(createApplicationTable, (err) => {
              if (err) {
                console.error("Error creating Application table:", err);
                return client.end();
              }
              console.log("APPLICATION table created or exists already!");

              client.query(createShortlistTable, (err) => {
                if (err) {
                  console.error("Error creating Shortlist table:", err);
                  return client.end();
                }
                console.log("SHORTLIST table created or exists already!");

                client.query(createVerificationCodesTable, (err) => {
                  if (err) {
                    console.error("Error creating Verification table:", err);
                  } else {
                    console.log("VERIFICATION table created or exists already!");
                  }
                  client.end();
                });
              });
            });
          });
        });
      });
    });
  });
});
