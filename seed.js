const { sequelize, Company, Job, Student, Recruiter, Application, Interest, Bookmark } = require('./models'); // Adjust the path as needed


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
        Quota: 3
    },
    {
        FirstName: 'Alice',
        LastName: 'Smith',
        School: 'Another University',
        EmailID: 'alicesmith@example.com',
        AcademicYear: 5,
        Age: 23,
        ResumeLink: 'https://example.com/resume/alicesmith',
        AcademicMajor: 'Business Administration',
        GPA: 3.5,
        WorkExperience: 'Marketing Coordinator at Company Y',
        PersonalStatement: 'Driven and goal-oriented.',
        Experience: 3,
        Quota: 3
    },
    {
        FirstName: 'ABC',
        LastName: 'DEF',
        School: 'Another University',
        EmailID: 'ABC@example.com',
        AcademicYear: 6,
        Age: 23,
        ResumeLink: 'https://example.com/resume/alicesmith',
        AcademicMajor: 'Business Administration',
        GPA: 3.5,
        WorkExperience: 'Marketing Coordinator at Company Y',
        PersonalStatement: 'Driven and goal-oriented.',
        Experience: 3,
        Quota: 3,
        Season: 'W25'
    },
    {
        FirstName: 'AB',
        LastName: 'DE',
        School: 'Another University',
        EmailID: 'Haber@example.com',
        AcademicYear: 3,
        Age: 23,
        ResumeLink: 'https://example.com/resume/alicesmith',
        AcademicMajor: 'Business Administration',
        GPA: 3.5,
        WorkExperience: 'Marketing Coordinator at Company Y',
        PersonalStatement: 'Driven and goal-oriented.',
        Experience: 3,
        Quota: 3,
        Season: 'W25'
    },
    {
        FirstName: 'XYZ',
        LastName: 'FRG',
        School: 'Another University',
        EmailID: 'XYZ@example.com',
        AcademicYear: 6,
        Age: 23,
        ResumeLink: 'https://example.com/resume/alicesmith',
        AcademicMajor: 'Business Administration',
        GPA: 3.5,
        WorkExperience: 'Marketing Coordinator at Company Y',
        PersonalStatement: 'Driven and goal-oriented.',
        Experience: 3,
        Quota: 3,
        Season: 'F24',
        Duration: '4',
        Preference: 'HYBRID'
    },
    {
        FirstName: 'Gaga',
        LastName: 'Drake',
        School: 'Another University',
        EmailID: 'Gaga@example.com',
        AcademicYear: 6,
        Age: 23,
        ResumeLink: 'https://example.com/resume/alicesmith',
        AcademicMajor: 'Business Administration',
        GPA: 3.5,
        WorkExperience: 'Marketing Coordinator at Company Y',
        PersonalStatement: 'Driven and goal-oriented.',
        Experience: 1,
        Quota: 3,
        Season: 'F25',
        Duration: '4',
        Preference: 'INPERSON'
    }
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
    { CompanyID: 1, Role: 'Software Engineer', RecruiterID: 1, Location: 'San Francisco', Experience: 2.5, Pay: 100000 },
    { CompanyID: 2, Role: 'Product Manager', RecruiterID: 2, Location: 'Seattle', Experience: 4, Pay: 120000 },
    // Add more job records as needed
];

const sampleApplications = [
    { JobID: 1, StudentID: 1, RecruiterID: 1, ApplicationTime: new Date(), Status: 'APPLIED' },
    { JobID: 2, StudentID: 2, RecruiterID: 2, ApplicationTime: new Date(), Status: 'REVIEW' },
    // Add more application records as needed
];

const sampleInterest = [
    { JobID: 1, StudentID: 1, MutualInterest: true },
    { JobID: 2, StudentID: 3, MutualInterest: false},
];

const sampleBookmarks = [
    { JobID: 1, StudentID: 1, Direction: 'RECRUITER' },
    { JobID: 1, StudentID: 2, Direction: 'RECRUITER' },
    // Add more bookmark records as needed
];

(async () => {
    const transaction = await sequelize.transaction();
    try {
        // await sequelize.sync({ force: true }); // Reset the database and recreate tables

        await Company.bulkCreate(sampleCompanies, { transaction });
        await Recruiter.bulkCreate(sampleRecruiters, { transaction });
        await Job.bulkCreate(sampleJobs, { transaction });
        await Student.bulkCreate(sampleStudents, { transaction });
        await Application.bulkCreate(sampleApplications, { transaction });
        await Interest.bulkCreate(sampleInterest, {transaction});
        await Bookmark.bulkCreate(sampleBookmarks, {transaction});

        await transaction.commit();
        console.log('Sample data has been seeded successfully.');
    } catch (error) {
        await transaction.rollback();
        console.error('Error seeding sample data:', error);
    }
})();
