const { sequelize, Company, Job, Student, Recruiter, Application, Shortlist } = require('./models'); // Adjust the path as needed

const sampleCompanies = [
  { Name: 'Company A', Industry: 'Tech', ContactEmail: 'companya@example.com' },
  { Name: 'Company B', Industry: 'Finance', ContactEmail: 'companyb@example.com' },
  // Add more company records as needed
];

const sampleStudents = [
  {
    StudentID: '1', // Changed to string to match the model definition
    FirstName: 'John',
    LastName: 'Doe',
    School: 'University of Example',
    EmailID: 'johndoe@example.com',
    AcademicYear: 3,
    Age: 22,
    ResumeLink: 'https://example.com/resume/johndoe',
    AcademicMajor: 'Computer Science',
    GPA: 3.7,
    WorkExperience: [{ company: 'Google', position: 'Software Engineering Intern' }, { company: 'Apple', title: 'Hardware Engineering Intern' }],
    PersonalStatement: 'Driven and goal-oriented.',
    Skills: ["Frontend", "Backend"],
    Interest: ["Software", "Tech"],
    Experience: 2.5,
    MaxQuota: 3,
    Duration: '12',
    Quota: 3
  },
  {
    StudentID: '2',
    FirstName: 'Alice',
    LastName: 'Smith',
    School: 'Another University',
    EmailID: 'alicesmith@example.com',
    AcademicYear: 5,
    Age: 23,
    ResumeLink: 'https://example.com/resume/alicesmith',
    AcademicMajor: 'Arts',
    GPA: 3.5,
    WorkExperience: [{ company: 'Google', title: 'Software Engineering Intern' }, { company: 'Apple', title: 'Hardware Engineering Intern' }],
    PersonalStatement: 'Driven and goal-oriented.',
    Skills: ["Frontend", "Backend"],
    Interest: ["Software", "Tech"],
    Experience: 3,
    Duration: '4',
    MaxQuota: 3,
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
    WorkExperience: [{ company: 'Google', title: 'Software Engineering Intern' }, { company: 'Apple', title: 'Hardware Engineering Intern' }],
    PersonalStatement: 'Driven and goal-oriented.',
    Experience: 3,
    Quota: 3,
    Season: 'W25',
    Duration: '8',
    MaxQuota: 3
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
    WorkExperience: [{ company: 'Google', title: 'Software Engineering Intern' }, { company: 'Apple', title: 'Hardware Engineering Intern' }],
    PersonalStatement: 'Driven and goal-oriented.',
    Experience: 3,
    Quota: 3,
    Season: 'W25',
    Duration: '12',
    MaxQuota: 3
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
    WorkExperience: [{ company: 'Google', title: 'Software Engineering Intern' }, { company: 'Apple', title: 'Hardware Engineering Intern' }],
    PersonalStatement: 'Driven and goal-oriented.',
    Experience: 3,
    Quota: 3,
    Season: 'F24',
    Duration: '4',
    Preference: 'HYBRID',
    MaxQuota: 3
  },
  {
    StudentID: 'oDNcwmuEt7XabxdBUHwtmSiG12T2',
    FirstName: 'Shubhankar',
    LastName: 'Vakde',
    School: 'Another University',
    EmailID: 'Gaga@example.com',
    AcademicYear: 5,
    Age: 23,
    ResumeLink: 'https://example.com/resume/alicesmith',
    AcademicMajor: 'Arts',
    GPA: 3.5,
    WorkExperience: [{ company: 'Google', title: 'Software Engineering Intern' }, { company: 'Apple', title: 'Hardware Engineering Intern' }],
    PersonalStatement: 'Driven and goal-oriented.',
    Experience: 1,
    Quota: 3,
    Season: 'F25',
    Duration: '4',
    Preference: 'INPERSON',
    MaxQuota: 3
  },
  {
    StudentID: 't1EkBurvqMS1XNPeIbuYxvtdqUy2',
    FirstName: 'Daine',
    LastName: 'Yip',
    School: 'University of British Columbia',
    EmailID: 'dainestu@wip.com',
    AcademicYear: 5,
    Age: 21,
    ResumeLink: 'resume.pdf',
    AcademicMajor: 'Computer Science',
    GPA: 3.5,
    WorkExperience: [{ company: 'Google', title: 'Software Engineering Intern' }, { company: 'Apple', title: 'Hardware Engineering Intern' }],
    PersonalStatement: 'Driven and goal-oriented.',
    Experience: 1,
    Quota: 3,
    Season: 'F25',
    Duration: '4',
    Preference: 'INPERSON',
    MaxQuota: 3
  },
];

const sampleRecruiters = [
  {
    RecruiterID: 'oDNcwmuEt7XabxdBUHwtmSiG12T2',
    FirstName: 'Shubh',
    LastName: 'Vakde',
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
  {
    RecruiterID: '8KnkvUbusoYnosi0SQP8yQDIrUh2',
    FirstName: 'Daine',
    LastName: 'Yip',
    CompanyID: 2,
    EmailID: 'recruiter3@example.com',
    CompanyName: 'Company B',
    Roles: 'HR Manager',
    Locations: 'New York',
  },
  {
    RecruiterID: 'Yng3AaKdUNWnkFOXmutw9Gw3Amo1',
    FirstName: 'Leyang',
    LastName: 'Pan',
    CompanyID: 2,
    EmailID: 'recruiter4@example.com',
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
      'CoverLetter': true,
      'VideoApplication': false,
      'CognitiveTest': false,
      'EnglishSample': false,
      'OnlineAssesment': false
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
    Terms: ['W25'],
    Environment: "HYBRID",
    JobDescription: "Doing this, Doing That",
    JobQualification: "Needs this, Needs that",
    Status: 'COMPLETED',
    RequiredDocuments: {
      'Resume': true,
      'CoverLetter': true,
      'VideoApplication': false,
      'CognitiveTest': false,
      'EnglishSample': false,
      'OnlineAssesment': false
    }
  },
  {
    CompanyID: 2,
    Type: 'Contract',
    Role: 'Product Manager',
    RecruiterID: '8KnkvUbusoYnosi0SQP8yQDIrUh2',
    Location: 'Seattle',
    DatePosted: new Date(),
    DateClosed: "2024-07-15",
    Experience: 4,
    Pay: 120000,
    Terms: ['W25'],
    Environment: "HYBRID",
    JobDescription: "Doing this, Doing That",
    JobQualification: "Needs this, Needs that",
    Status: 'COMPLETED',
    RequiredDocuments: {
      'Resume': true,
      'CoverLetter': true,
      'VideoApplication': false,
      'CognitiveTest': false,
      'EnglishSample': false,
      'OnlineAssesment': false
    }
  }
  // Add more job records as needed
];

const sampleApplications = [
  { JobID: 1, StudentID: '1', RecruiterID: 'oDNcwmuEt7XabxdBUHwtmSiG12T2', ApplicationTime: new Date(), Status: 'APPLIED', SubmittedDocuments: JSON.stringify({ Resume: "resume.pdf" }) },
  { JobID: 2, StudentID: '2', RecruiterID: '12dwedw3ds', ApplicationTime: new Date(), Status: 'REVIEWED', SubmittedDocuments: JSON.stringify({ Resume: "resume.pdf", CoverLetter: "coverletter.pdf", EnglishSample: "englishsample.pdf" }) },
  { JobID: 3, StudentID: '1', RecruiterID: '8KnkvUbusoYnosi0SQP8yQDIrUh2', ApplicationTime: new Date(), Status: 'APPLIED', SubmittedDocuments: JSON.stringify({ Resume: "resume.pdf" }) },
  { JobID: 3, StudentID: '2', RecruiterID: '8KnkvUbusoYnosi0SQP8yQDIrUh2', ApplicationTime: new Date(), Status: 'REVIEWED', SubmittedDocuments: JSON.stringify({ CoverLetter: "coverletter.pdf" }) },
  { JobID: 3, StudentID: 'oDNcwmuEt7XabxdBUHwtmSiG12T2', RecruiterID: '8KnkvUbusoYnosi0SQP8yQDIrUh2', ApplicationTime: new Date(), Status: 'ACCEPT', SubmittedDocuments: JSON.stringify({ EnglishSample: "englishsample.pdf" }) },
  { JobID: 3, StudentID: 'erf', RecruiterID: '8KnkvUbusoYnosi0SQP8yQDIrUh2', ApplicationTime: new Date(), Status: 'COMPLETE', SubmittedDocuments: JSON.stringify({ Resume: "resume.pdf" }) },
  // Add more application records as needed
];

const sampleShortlist = [
  { StudentID: '1', JobID: 1, RecruiterID: 'oDNcwmuEt7XabxdBUHwtmSiG12T2' },
  { StudentID: '2', JobID: 2, RecruiterID: '12dwedw3ds' },
  { StudentID: '2', JobID: 3, RecruiterID: '8KnkvUbusoYnosi0SQP8yQDIrUh2' },
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
    await Shortlist.bulkCreate(sampleShortlist, { transaction });

    await transaction.commit();
    console.log('Sample data has been seeded successfully.');
  } catch (error) {
    await transaction.rollback();
    console.error('Error seeding sample data:', error);
  }
})();
