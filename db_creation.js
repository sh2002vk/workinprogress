delete require.cache[require.resolve('dotenv/config')];
require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'wipTest'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the MySQL server:', err);
        process.exit(1);
    }
    console.log("Connected to the MySQL server.");

    const createCompanyTable = `
        CREATE TABLE IF NOT EXISTS COMPANY (
            CompanyID INT AUTO_INCREMENT PRIMARY KEY,
            Name VARCHAR(255) NOT NULL,
            Industry VARCHAR(255) NOT NULL,
            ContactEmail VARCHAR(255) UNIQUE
        );`;

    const createJobTable = `
        CREATE TABLE IF NOT EXISTS JOB (
            JobID INT AUTO_INCREMENT PRIMARY KEY,
            RecruiterID VARCHAR(255) NOT NULL,
            CompanyID INT NOT NULL,
            Type ENUM('INTERNSHIP', 'CONTRACT', 'OTHER'),
            Role VARCHAR(255),
            Location VARCHAR(255),
            DatePosted DATETIME NOT NULL,
            Experience FLOAT,
            Pay FLOAT,
            Environment ENUM('REMOTE', 'INPERSON', 'HYBRID'),
            Duration ENUM('4', '8', '12'),
            StartTime ENUM('F24', 'W25', 'S25', 'F25'),
            EndTime ENUM('F24', 'W25', 'S25', 'F25'),
            Industry ENUM('Technology', 'Business'),
            JobDescription TEXT,
            JobQualification TEXT,
            Status ENUM('DRAFT', 'COMPLETED') NOT NULL,
            RequiredDocuments JSON,
            FOREIGN KEY (CompanyID) REFERENCES COMPANY(CompanyID) ON DELETE CASCADE,
            FOREIGN KEY (RecruiterID) REFERENCES RECRUITER(RecruiterID) ON DELETE CASCADE
        );`;

    const createStudentTable = `
        CREATE TABLE IF NOT EXISTS STUDENT (
            StudentID VARCHAR(255) PRIMARY KEY,
            FirstName VARCHAR(100) NOT NULL,
            LastName VARCHAR(100) NOT NULL,
            School VARCHAR(255) NOT NULL,
            EmailID VARCHAR(255) NOT NULL UNIQUE,
            AcademicYear INT NOT NULL,
            Age INT,
            ResumeLink TEXT,
            AcademicMajor VARCHAR(100) NOT NULL,
            GPA DECIMAL(3, 2),
            WorkExperience TEXT NOT NULL,
            PersonalStatement TEXT NOT NULL,
            Experience FLOAT NOT NULL,
            Quota INT NOT NULL,
            Preference ENUM('REMOTE', 'INPERSON', 'HYBRID'),
            Duration ENUM('4', '8', '12'),
            Season ENUM('F24', 'W25', 'S25', 'F25')
        );`;

    const createRecruiterTable = `
        CREATE TABLE IF NOT EXISTS RECRUITER (
            RecruiterID VARCHAR(255) PRIMARY KEY,
            FirstName VARCHAR(100) NOT NULL,
            LastName VARCHAR(100) NOT NULL,
            CompanyID INT NOT NULL,
            EmailID VARCHAR(255) NOT NULL UNIQUE,
            CompanyName VARCHAR(255) NOT NULL,
            Roles TEXT NOT NULL,
            Locations TEXT,
            FOREIGN KEY (CompanyID) REFERENCES COMPANY(CompanyID) ON DELETE CASCADE
        );`;

    const createApplicationTable = `
        CREATE TABLE IF NOT EXISTS APPLICATION (
            ApplicationID INT AUTO_INCREMENT PRIMARY KEY, 
            JobID INT NOT NULL,
            StudentID VARCHAR(255) NOT NULL,
            RecruiterID VARCHAR(255),
            ApplicationTime DATETIME NOT NULL,
            Status ENUM('DRAFT', 'APPLIED', 'REVIEWED', 'INTERVIEW', 'ACCEPT', 'REJECT') NOT NULL, 
            SubmittedDocuments JSON,
            FOREIGN KEY (JobID) REFERENCES JOB(JobID) ON DELETE CASCADE,
            FOREIGN KEY (StudentID) REFERENCES STUDENT(StudentID) ON DELETE CASCADE,
            FOREIGN KEY (RecruiterID) REFERENCES RECRUITER(RecruiterID) ON DELETE CASCADE
        );`;


    // const createInterestTable = `
    //     CREATE TABLE IF NOT EXISTS INTEREST (
    //         JobID INT NOT NULL,
    //         StudentID INT NOT NULL,
    //         Direction ENUM('RECRUITER', 'STUDENT', 'MUTUAL') NOT NULL,
    //         FOREIGN KEY (JobID) REFERENCES JOB(JobID) ON DELETE CASCADE,
    //         FOREIGN KEY (StudentID) REFERENCES STUDENT(StudentID) ON DELETE CASCADE,
    //         PRIMARY KEY (JobID, StudentID)
    //     );`;

    const createBookmarkTable = `
        CREATE TABLE IF NOT EXISTS BOOKMARK (
            BookmarkID INT AUTO_INCREMENT PRIMARY KEY,
            JobID INT NOT NULL,
            StudentID VARCHAR(255) NOT NULL,
            Direction ENUM('RECRUITER', 'STUDENT') NOT NULL,
            FOREIGN KEY (JobID) REFERENCES JOB(JobID) ON DELETE CASCADE,
            FOREIGN KEY (StudentID) REFERENCES STUDENT(StudentID) ON DELETE CASCADE
        );`;

    const createShortlistTable = `
        CREATE TABLE IF NOT EXISTS SHORTLIST (
            ShortlistID INT AUTO_INCREMENT PRIMARY KEY,
            StudentID VARCHAR(255) NOT NULL,
            JobID INT NOT NULL,
            RecruiterID VARCHAR(255) NOT NULL,
            FOREIGN KEY (StudentID) REFERENCES STUDENT(StudentID) ON DELETE CASCADE,
            FOREIGN KEY (JobID) REFERENCES JOB(JobID) ON DELETE CASCADE,
            FOREIGN KEY (RecruiterID) REFERENCES RECRUITER(RecruiterID) ON DELETE CASCADE
        );`;

    // Creation execution
    connection.query(createCompanyTable, function (err) {
        if (err) {
            console.error("Error creating Company table:", err);
            return connection.end();
        }
        console.log("COMPANY table created or exists already!");

        connection.query(createRecruiterTable, function (err) {
            if (err) {
                console.error("Error creating Recruiter table:", err);
                return connection.end();
            }
            console.log("RECRUITER table created or exists already!");

            connection.query(createStudentTable, function (err) {
                if (err) {
                    console.error("Error creating STUDENT table:", err);
                    return connection.end();
                }
                console.log("STUDENT table created or exists already!");

                connection.query(createJobTable, function (err) {
                    if (err) {
                        console.error("Error creating JOB table:", err);
                        return connection.end();
                    }
                    console.log("JOB table created or exists already!");

                    connection.query(createBookmarkTable, function (err) {
                        if (err) {
                            console.error("Error creating BOOKMARK table:", err);
                            return connection.end();
                        }
                        console.log("BOOKMARK table created or exists already!");
                        
                        connection.query(createApplicationTable, function (err) {
                            if (err) {
                                console.error("Error creating Application table:", err);
                                return connection.end();
                            }
                            console.log("APPLICATION table created or exists already!");

                            connection.query(createShortlistTable, function (err) {
                                if (err) {
                                    console.error("Error creating Shortlist table:", err);
                                } else {
                                    console.log("SHORTLIST table created or exists already!");
                                }
                                connection.end();
                            });
                        });
                    });
                });
            });
        });
    });
});
