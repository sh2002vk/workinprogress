const { sequelize, Company, Job, Student, Recruiter, Application } = require('./models'); // Adjust the path as needed

const sampleCompanies = [
    { Name: 'Company A', Industry: 'Tech', ContactEmail: 'companya@example.com' },
    { Name: 'Company B', Industry: 'Finance', ContactEmail: 'companyb@example.com' },
    // Add more company records as needed
];

const sampleStudents = [
    {
        FirstName: 'John',
        LastName: 'Doe',
        School: 'University of Example',
        EmailID: 'johndoe@example.com',
        AcademicYear: 3,
        Age: 22,
        ResumeLink: 'https://example.com/resume/johndoe',
        AcademicMajor: 'Computer Science',
        GPA: 3.7,
        WorkExperience: 'Intern at Company X, Freelancer',
        PersonalStatement: 'Passionate about technology and innovation.',
        Experience: 2.5,
    },
    {
        FirstName: 'Alice',
        LastName: 'Smith',
        School: 'Another University',
        EmailID: 'alicesmith@example.com',
        AcademicYear: 4,
        Age: 23,
        ResumeLink: 'https://example.com/resume/alicesmith',
        AcademicMajor: 'Business Administration',
        GPA: 3.5,
        WorkExperience: 'Marketing Coordinator at Company Y',
        PersonalStatement: 'Driven and goal-oriented.',
        Experience: 3,
    },
    // Add more student records as needed
];

const sampleRecruiters = [
    {
        FirstName: 'Recruiter',
        LastName: 'One',
        CompanyID: 1,
        EmailID: 'recruiter1@example.com',
        CompanyName: 'Company A',
        Roles: 'Technical Recruiter',
        Locations: 'San Francisco, Seattle',
    },
    {
        FirstName: 'Recruiter',
        LastName: 'Two',
        CompanyID: 2,
        EmailID: 'recruiter2@example.com',
        CompanyName: 'Company B',
        Roles: 'HR Manager',
        Locations: 'New York',
    },
    // Add more recruiter records as needed
];

const sampleJobs = [
    { CompanyID: 1, Role: 'Software Engineer', Location: 'San Francisco', Experience: 2.5, Pay: 100000 },
    { CompanyID: 1, Role: 'Product Manager', Location: 'Seattle', Experience: 4, Pay: 120000 },
    // Add more job records as needed
];

const sampleApplications = [
    { JobID: 1, StudentID: 1, RecruiterID: 1, ApplicationTime: new Date(), Status: 'APPLIED' },
    { JobID: 2, StudentID: 2, RecruiterID: 2, ApplicationTime: new Date(), Status: 'REVIEW' },
    // Add more application records as needed
];

(async () => {
    try {
        await sequelize.sync({ force: true }); // Reset the database and recreate tables
        await Company.bulkCreate(sampleCompanies);
        await Job.bulkCreate(sampleJobs);
        await Student.bulkCreate(sampleStudents);
        await Recruiter.bulkCreate(sampleRecruiters);
        await Application.bulkCreate(sampleApplications);

        console.log('Sample data has been seeded successfully.');
    } catch (error) {
        console.error('Error seeding sample data:', error);
    } finally {
        await sequelize.close(); // Close the database connection when done
    }
})();
