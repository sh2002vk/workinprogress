import request from 'supertest';
import { expect } from 'chai';
import app from '../server.js';

describe('API Tests', function () {
    // Sample data
    const sampleRecruiter = {
        RecruiterID: 'rec123',
        FirstName: 'John',
        LastName: 'Doe',
        CompanyID: 1,
        EmailID: 'john.doe@example.com',
        CompanyName: 'Example Corp',
        Roles: 'HR',
        Locations: 'NY'
    };

    const sampleStudent = {
        StudentID: 'stu123',
        FirstName: 'Jane',
        LastName: 'Doe',
        School: 'XYZ University',
        EmailID: 'jane.doe@example.com',
        AcademicYear: 3,
        Age: 21,
        ResumeLink: 'http://example.com/resume',
        AcademicMajor: 'Computer Science',
        GPA: 3.8,
        WorkExperience: 'Intern at ABC',
        PersonalStatement: 'Passionate about tech',
        Experience: 1.5,
        Preference: 'REMOTE',
        Quota: 2,
        Level: 2
    };

    const sampleCompany = {
        Name: 'Example Corp',
        Industry: 'Technology',
        ContactEmail: 'contact@example.com'
    };

    const sampleJobPosting = {
        Role: 'Software Engineer',
        Location: 'NY',
        Experience: 2,
        Pay: 100000,
        Environment: 'REMOTE',
        Duration: '8',
        StartTime: 'F24',
        EndTime: 'F25',
        Industry: 'Technology',
        RequiredDocuments: JSON.stringify({ Resume: true, CoverLetter: true })
    };

    let createdRecruiterId, createdStudentId, createdCompanyId, createdJobId;


    // Recruiter tests
    describe('Recruiter Account Routes', function () {
        before(function (done) {
            request(app)
                .post('/account/company/create')
                .send(sampleCompany)
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    createdCompanyId = res.body.CompanyID;
                    expect(res.body).to.have.property('CompanyID');
                    sampleRecruiter.CompanyID = createdCompanyId; // Update the recruiter sample data with the created company ID
                    done();
                });
        });

        it('should create a new recruiter', function (done) {
            request(app)
                .post('/account/recruiter/create')
                .send(sampleRecruiter)
                .expect(201)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    createdRecruiterId = res.body.RecruiterID;
                    expect(res.body).to.have.property('RecruiterID');
                    done();
                });
        });

        it('should update an existing recruiter', function (done) {
            const updatedData = { FirstName: 'Johnathan' };
            request(app)
                .put('/account/recruiter/update')
                .send({ recruiterID: createdRecruiterId, updatedData })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.data.FirstName).to.equal('Johnathan');
                    done();
                });
        });

        it('should delete a recruiter', function (done) {
            request(app)
                .delete('/account/recruiter/delete')
                .send({ deleteID: createdRecruiterId })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.message).to.equal('Successfully deleted recruiter');
                    done();
                });
        });

        after(function (done) {
            request(app)
                .delete('/account/company/delete')
                .send({ deleteId: createdCompanyId })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.message).to.equal('Successfully deleted company');
                    done();
                });
        });
    });

    // Student tests
    describe('Student Account Routes', function () {
        it('should create a new student', function (done) {
            request(app)
                .post('/account/student/create')
                .send(sampleStudent)
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    createdStudentId = res.body.StudentID;
                    expect(res.body).to.have.property('StudentID');
                    done();
                });
        });

        it('should update an existing student', function (done) {
            const updatedData = { FirstName: 'Janet' };
            request(app)
                .put('/account/student/update')
                .send({ studentID: createdStudentId, updatedData })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.FirstName).to.equal('Janet');
                    done();
                });
        });

        it('should delete a student', function (done) {
            request(app)
                .delete('/account/student/delete')
                .send({ deleteID: createdStudentId })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.message).to.equal('Successfully deleted student');
                    done();
                });
        });
    });

    // Company tests
    describe('Company Account Routes', function () {
        it('should create a new company', function (done) {
            request(app)
                .post('/account/company/create')
                .send(sampleCompany)
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    createdCompanyId = res.body.CompanyID;
                    expect(res.body).to.have.property('CompanyID');
                    done();
                });
        });

        it('should update an existing company', function (done) {
            const updatedData = { Name: 'Example Corporation' };
            request(app)
                .put('/account/company/update')
                .send({ companyID: createdCompanyId, updatedData })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.Name).to.equal('Example Corporation');
                    done();
                });
        });

        it('should delete a company', function (done) {
            request(app)
                .delete('/account/company/delete')
                .send({ deleteId: createdCompanyId })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.message).to.equal('Successfully deleted company');
                    done();
                });
        });
    });

    // Recruiter Action Routes
    describe('Recruiter Action Routes', function () {
        before(function (done) {
            // Create company and recruiter for testing
            request(app)
                .post('/account/company/create')
                .send(sampleCompany)
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    createdCompanyId = res.body.CompanyID;
                    sampleRecruiter.CompanyID = createdCompanyId;
                    request(app)
                        .post('/account/recruiter/create')
                        .send(sampleRecruiter)
                        .expect(201)
                        .end((err, res) => {
                            if (err) return done(err);
                            createdRecruiterId = res.body.RecruiterID;
                            request(app)
                                .post('/account/student/create')
                                .send(sampleStudent)
                                .expect(201)
                                .end((err, res) => {
                                    if (err) return done(err);
                                    createdStudentId = res.body.StudentID;
                                    expect(res.body).to.have.property('StudentID');
                                    done();
                                });
                        });
                });
        });

        it('should get filtered students, 1 result', function (done) {
            request(app)
                .get('/action/recruiter/getStudents')
                .send({ preference: 'REMOTE' }) // example filter
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.have.lengthOf(1);
                    done();
                });
        });

        it('should get no filter all students, 1 result', function (done) {
            request(app)
                .get('/action/recruiter/getStudents')
                .send({}) // example filter
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.have.lengthOf(1);
                    done();
                });
        });

        it('should get filtered students, no result', function (done) {
            request(app)
                .get('/action/recruiter/getStudents')
                .send({ level: 5 }) // example filter
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.have.lengthOf(0);
                    done();
                });
        });

        it('should shortlist a student', function (done) {
            request(app)
                .post('/action/recruiter/shortlistStudent')
                .send({ RecruiterID: createdRecruiterId, StudentID: 'stu123', JobID: 'job123' })
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('ShortlistID');
                    done();
                });
        });

        it('should get shortlisted students', function (done) {
            request(app)
                .get('/action/recruiter/getShortlistedStudents')
                .query({ recruiterID: createdRecruiterId })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.have.lengthOf(1);
                    done();
                });
        });

        // it('should get applicants', function (done) {
        //     request(app)
        //         .get('/recruiter/getApplicants')
        //         .query({ recruiterID: createdRecruiterId })
        //         .expect(200)
        //         .end((err, res) => {
        //             if (err) return done(err);
        //             expect(res.body).to.have.property('data');
        //             done();
        //         });
        // });

        it('should bookmark a student', function (done) {
            request(app)
                .post('/action/recruiter/bookmarkStudent')
                .send({ recruiterID: createdRecruiterId, studentID: 'stu123', jobID: 'job123' })
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('BookmarkID');
                    done();
                });
        });

        it('should get students that applied to a job', function (done) {
            request(app)
                .get('/action/recruiter/getStudentsThatApplied')
                .query({ jobID: 'job123' })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('data');
                    done();
                });
        });

        it('should create a new job posting', function (done) {
            request(app)
                .post('/action/recruiter/createJobPosting')
                .send({ ...sampleJobPosting, RecruiterID: createdRecruiterId, CompanyID: createdCompanyId })
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    createdJobId = res.body.JobID;
                    expect(res.body).to.have.property('JobID');
                    done();
                });
        });

        it('should update an existing job posting', function (done) {
            const updatedData = { Role: 'Senior Software Engineer' };
            request(app)
                .put('/action/recruiter/updateJobPosting')
                .send({ jobID: createdJobId, updatedData })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.Role).to.equal('Senior Software Engineer');
                    done();
                });
        });

        it('should get job postings for a recruiter', function (done) {
            request(app)
                .get('/action/recruiter/getJobPostings')
                .query({ recruiterID: createdRecruiterId })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.have.lengthOf(1);
                    done();
                });
        });

        it('should delete a job posting', function (done) {
            request(app)
                .delete('/action/recruiter/deleteJobPosting')
                .send({ jobID: createdJobId })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.message).to.equal('Successfully deleted job');
                    done();
                });
        });

        it('should get job postings for a recruiter', function (done) {
            request(app)
                .get('/action/recruiter/getJobPostings')
                .query({ recruiterID: createdRecruiterId })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.have.lengthOf(0);
                    done();
                });
        });

        after(function (done) {
            // Cleanup: Delete the recruiter and company
            request(app)
                .delete('/account/recruiter/delete')
                .send({ deleteID: createdRecruiterId })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    request(app)
                        .delete('/account/company/delete')
                        .send({ deleteId: createdCompanyId })
                        .expect(200)
                        .end((err, res) => {
                            if (err) return done(err);
                            expect(res.body.message).to.equal('Successfully deleted company');
                            request(app)
                                    .delete('/account/student/delete')
                                    .send({ deleteID: createdStudentId })
                                    .expect(200)
                                    .end((err, res) => {
                                        if (err) return done(err);
                                        expect(res.body.message).to.equal('Successfully deleted student');
                                        done();
                                    });
                            });
                        });
                });
        });
});
