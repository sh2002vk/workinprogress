const { sequelize, Company, Job, Student, Recruiter, Application, Bookmark } = require('./models'); // Adjust the path as needed


const sampleCompanies = [
    { Name: 'Company A', Industry: 'Tech', ContactEmail: 'companya@example.com' },
    { Name: 'Company B', Industry: 'Finance', ContactEmail: 'companyb@example.com' },
    // Add more company records as needed
];

const sampleStudents = [
    {
        StudentID: 'abc',
        FirstName: 'John',
        LastName: 'Doe',
        School: 'University of Example',
        EmailID: 'johndoe@example.com',
        AcademicYear: 3,
        Age: 22,
        ResumeLink: 'https://example.com/resume/johndoe',
        AcademicMajor: 'Computer Science',
        GPA: 3.7,
        WorkExperience: [{ company: 'Google', position: 'Software Engineering Intern' }, { company: 'Apple', position: 'Hardware Engineering Intern' }],
        PersonalStatement: 'Passionate about technology and innovation.',
        Experience: 2.5,
        Duration: '12',
        Quota: 3
    },
    {
        StudentID: 'cdf',
        FirstName: 'Alice',
        LastName: 'Smith',
        School: 'Another University',
        EmailID: 'alicesmith@example.com',
        AcademicYear: 5,
        Age: 23,
        ResumeLink: 'https://example.com/resume/alicesmith',
        AcademicMajor: 'Arts',
        GPA: 3.5,
        WorkExperience: [{ company: 'Google', position: 'Software Engineering Intern' }, { company: 'Apple', position: 'Hardware Engineering Intern' }],
        PersonalStatement: 'Driven and goal-oriented.',
        Experience: 3,
        Duration: '4',
        Quota: 3
    },
    {
        StudentID: 'ehj',
        FirstName: 'ABC',
        LastName: 'DEF',
        School: 'Another University',
        EmailID: 'ABC@example.com',
        AcademicYear: 6,
        Age: 23,
        ResumeLink: 'https://example.com/resume/alicesmith',
        AcademicMajor: 'Statistics',
        GPA: 3.5,
        WorkExperience: [{ company: 'Google', position: 'Software Engineering Intern' }, { company: 'Apple', position: 'Hardware Engineering Intern' }],
        PersonalStatement: 'Driven and goal-oriented.',
        Experience: 3,
        Quota: 3,
        Season: 'W25',
        Duration: '8',
    },
    {
        StudentID: 'erf',
        FirstName: 'AB',
        LastName: 'DE',
        School: 'Another University',
        EmailID: 'Haber@example.com',
        AcademicYear: 3,
        Age: 23,
        ResumeLink: 'https://example.com/resume/alicesmith',
        AcademicMajor: 'Engineering',
        GPA: 3.5,
        WorkExperience: [{ company: 'Google', position: 'Software Engineering Intern' }, { company: 'Apple', position: 'Hardware Engineering Intern' }],
        PersonalStatement: 'Driven and goal-oriented.',
        Experience: 3,
        Quota: 3,
        Season: 'W25',
        Duration: '12',
    },
    {
        StudentID: 'adwesdbc',
        FirstName: 'XYZ',
        LastName: 'FRG',
        School: 'Another University',
        EmailID: 'XYZ@example.com',
        AcademicYear: 6,
        Age: 23,
        ResumeLink: 'https://example.com/resume/alicesmith',
        AcademicMajor: 'Computer Science',
        GPA: 3.5,
        WorkExperience: [{ company: 'Google', position: 'Software Engineering Intern' }, { company: 'Apple', position: 'Hardware Engineering Intern' }],
        PersonalStatement: 'Driven and goal-oriented.',
        Experience: 3,
        Quota: 3,
        Season: 'F24',
        Duration: '4',
        Preference: 'HYBRID'
    },
    {
        StudentID: 'adwsdswddedebc',
        FirstName: 'Gaga',
        LastName: 'Drake',
        School: 'Another University',
        EmailID: 'Gaga@example.com',
        AcademicYear: 5,
        Age: 23,
        ResumeLink: 'https://example.com/resume/alicesmith',
        AcademicMajor: 'Arts',
        GPA: 3.5,
        WorkExperience: [{ company: 'Google', position: 'Software Engineering Intern' }, { company: 'Apple', position: 'Hardware Engineering Intern' }],
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
        RecruiterID: 'oDNcwmuEt7XabxdBUHwtmSiG12T2',
        FirstName: 'Recruiter',
        LastName: 'One',
        CompanyID: 1,
        EmailID: 'recruiter1@example.com',
        CompanyName: 'Company A',
        Roles: 'Technical Recruiter',
        Locations: 'San Francisco, Seattle',
    },
    {
        RecruiterID: '12dwedw3ds',
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
    {
        CompanyID: 1,
        Type: 'Internship',
        Role: 'Software Engineer',
        RecruiterID: 'oDNcwmuEt7XabxdBUHwtmSiG12T2',
        Location: 'San Francisco',
        DatePosted: new Date(),
        Experience: 2.5,
        Pay: 100000,
        Environment: 'INPERSON',
        Duration: '4',
        Terms: ['F24'],
        Industry: 'Technology',
        JobDescription: "Doing this, Doing That",
        JobQualification: "Needs this, Needs that",
        Status: 'DRAFT',
        RequiredDocuments: {
            'Resume': true,
            'CoverLetter': true
        }
    },
    {
        CompanyID: 2,
        Type: 'Contract',
        Role: 'Product Manager',
        RecruiterID: '12dwedw3ds',
        Location: 'Seattle',
        DatePosted: new Date(),
        Experience: 4,
        Pay: 120000,
        Terms: ['W25', 'S25'],
        Environment: "HYBRID",
        JobDescription: "Doing this, Doing That",
        JobQualification: "Needs this, Needs that",
        Status: 'COMPLETED'
    }
    // Add more job records as needed
];

(async () => {
    const transaction = await sequelize.transaction();
    try {
        // await sequelize.sync({ force: true }); // Reset the database and recreate tables

        await Company.bulkCreate(sampleCompanies, { transaction });
        await Recruiter.bulkCreate(sampleRecruiters, { transaction });
        await Job.bulkCreate(sampleJobs, { transaction });
        await Student.bulkCreate(sampleStudents, { transaction });

        await transaction.commit();
        console.log('Sample data has been seeded successfully.');
    } catch (error) {
        await transaction.rollback();
        console.error('Error seeding sample data:', error);
    }
})();
