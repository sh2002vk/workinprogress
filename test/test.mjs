import request from 'supertest';
import { expect } from 'chai';
import app from '../server.js';

describe('API Tests', function () {
    // Sample data

    let createdRecruiterId, createdStudentId, createdCompanyId, createdJobId, createdApplicationId;

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

    let sampleJobPosting = {
        RecruiterID: null,
        CompanyID: null,
        Role: 'Software Engineer',
        Location: 'NY',
        Experience: 2,
        Pay: 100000,
        Environment: 'REMOTE',
        Duration: '8',
        Terms: JSON.stringify(['F24']),
        Industry: 'Technology',
        RequiredDocuments: {
            Resume: true,
            CoverLetter: true
        },
        DatePosted: new Date(),
        Status: 'DRAFT'
    };
    const sampleApplication = {
        JobID: null,
        StudentID: null,
        RecruiterID: null,
        ApplicationTime: new Date(),
        Status: 'REVIEWED',
        SubmittedDocuments: {
            Resume: "resume.txt",
            CoverLetter: "COVERLETTER",
            EnglishSample: "ENGLISHSAMPLE.TXT"
        }
    };

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
                .post('/action/recruiter/getStudents')
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
                .post('/action/recruiter/getStudents')
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
                .post('/action/recruiter/getStudents')
                .send({ level: 5 }) // example filter
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.have.lengthOf(0);
                    done();
                });
        });

        it('should create a new job posting', function (done) {
            sampleJobPosting.CompanyID = createdCompanyId;
            sampleJobPosting.RecruiterID = createdRecruiterId;
            sampleJobPosting.DatePosted = new Date();

            request(app)
                .post('/action/recruiter/createJobPosting')
                .send(sampleJobPosting)
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    createdJobId = res.body.JobID;
                    expect(res.body).to.have.property('JobID');
                    done();
                });
        });

        it('should shortlist a student', function (done) {
            request(app)
                .post('/action/recruiter/shortlistStudent')
                .send({ RecruiterID: createdRecruiterId, StudentID: createdStudentId, JobID: createdJobId })
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.data).to.have.property('ShortlistID');
                    done();
                });
        });

        it('should get shortlisted students', function (done) {
            request(app)
                .get('/action/recruiter/getShortlistedStudents')
                .send({ recruiterID: createdRecruiterId })
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
                .send({ recruiterID: createdRecruiterId, studentID: 'stu123', direction: "STUDENT" })
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
                .send({ jobID: createdJobId })
                .expect(404)
                .end((err, res) => {
                    if (err) return done(err);
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
                .get(`/action/recruiter/getJobPostings?recruiterID=${createdRecruiterId}`)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.have.lengthOf(1);
                    done();
                });
        });

        it('should get job postings for a recruiter - 1', function (done) {
            request(app)
                .get(`/action/recruiter/getJobPostings?recruiterID=${createdRecruiterId}`)
                .send({ recruiterID: createdRecruiterId })
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

        it('should get job postings for a recruiter - 0', function (done) {
            request(app)
                .get(`/action/recruiter/getJobPostings?recruiterID=${createdRecruiterId}`)
                .send({ recruiterID: createdRecruiterId })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
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


    describe('Student Action Routes', function () {
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
                                    sampleJobPosting.CompanyID = createdCompanyId;
                                    sampleJobPosting.RecruiterID = createdRecruiterId;
                                    request(app)
                                        .post('/action/recruiter/createJobPosting')
                                        .send(sampleJobPosting)
                                        .expect(201)
                                        .end((err, res) => {
                                            if (err) return done(err);
                                            createdJobId = res.body.JobID;
                                            sampleApplication.JobID = createdJobId;
                                            sampleApplication.StudentID = createdStudentId;
                                            sampleApplication.RecruiterID = createdRecruiterId;
                                            request(app)
                                                .post('/action/student/createApplication')
                                                .send(sampleApplication)
                                                .expect(201)
                                                .end((err, res) => {
                                                    if (err) return done(err);
                                                    expect(res.body.data).to.have.property('ApplicationID')
                                                    createdApplicationId = res.body.data.ApplicationID;
                                                    done();
                                                })
                                        })
                                });
                        });
                });
        });
        it('should request and return the contact of a recruiter', function (done) {
            request(app)
                .post('/action/recruiter/shortlistStudent')
                .send({ RecruiterID: createdRecruiterId, StudentID: createdStudentId, JobID: createdJobId})
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    request(app)
                        .get('/action/student/getRecruiterContact')
                        .send({StudentID: createdStudentId, RecruiterID: createdRecruiterId})
                        .expect(200)
                        .end((err, res) => {
                            if (err) return done(err);
                            expect(res.body.message).to.equal(`${createdRecruiterId} is interested in ${createdStudentId}`);
                            done();
                        })
                });
        });
        it('should request and not return the contact of a recruiter', function (done) {
            request(app)
                .get('/action/student/getRecruiterContact')
                .send({StudentID: createdStudentId, RecruiterID: 2})
                .expect(404)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.message).to.equal(`2 is NOT interested in ${createdStudentId}`);
                    done();
                })
        });
        it('should filter jobs given a simple filter - returns 1', function (done) {
            request(app)
                .get('/action/student/getJobs')
                .send({ environment: 'REMOTE' }) // example filter
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.have.lengthOf(1);
                    done();
                });
        });
        it('should filter jobs given a simple filter - returns 1', function (done) {
            request(app)
                .get('/action/student/getJobs')
                .send({ role: 'Software Engineer', location: 'NY' }) // example filter
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.have.lengthOf(1);
                    done();
                });
        });
        it('should filter jobs given a simple filter - returns 0', function (done) {
            request(app)
                .get('/action/student/getJobs')
                .send({ role: 'Plummer'}) // example filter
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.have.lengthOf(0);
                    done();
                });
        });
        it('should filter jobs given a complex filter - returns 0', function (done) {
            request(app)
                .get('/action/student/getJobs')
                .send({ role: 'Software Engineer', location: "North Pole"}) // example filter
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.have.lengthOf(0);
                    done();
                });
        });
        it('should filter jobs given an empty filter - returns 1', function (done) {
            request(app)
                .get('/action/student/getJobs')
                .send({}) // example filter
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.have.lengthOf(1);
                    done();
                });
        });
        it('should filter jobs given an bad filter - returns 1', function (done) {
            request(app)
                .get('/action/student/getJobs')
                .send({BadFilter: "goobaloo"}) // example filter
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.have.lengthOf(1);
                    done();
                });
        });
        it('should create a bookmark for a student', function (done) {
            request(app)
                .post('/action/student/bookmarkJob')
                .send({StudentID: createdStudentId, JobID: createdJobId})
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('data');
                    expect(res.body.message).to.equal('Bookmark successfully created');
                    done();
                })
        });
        it('should error while creating a bookmark for a student', function (done) {
            request(app)
                .post('/action/student/bookmarkJob')
                .send({JobID: createdJobId})
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.message).to.equal('Error bookmarking job');
                    done();
                })
        });
        it('should delete a bookmark for a student', function (done) {
            request(app)
                .delete('/action/student/unbookmarkJob')
                .send({StudentID: createdStudentId, JobID: createdJobId})
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.message).to.equal("Successfully removed bookmark");
                    done();
                })
        });
        it('should not be able to find a bookmark to delete for a student', function (done) {
            request(app)
                .delete('/action/student/unbookmarkJob')
                .send({StudentID: 2, JobID: createdJobId})
                .expect(404)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.message).to.equal("Bookmark not found");
                    done();
                })
        });
        it('should error when attempting to delete this bookmark for a student', function (done) {
            request(app)
                .delete('/action/student/unbookmarkJob')
                .send({StudentID: 2, Location: "NorthPole"})
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.message).to.equal("Error when removing bookmark");
                    done();
                })
        });
        it('should create an application for a student', function (done) {
            sampleApplication.RecruiterID = createdRecruiterId;
            sampleApplication.StudentID = createdStudentId;
            sampleApplication.JobID = createdJobId;
            request(app)
                .post('/action/student/createApplication')
                .send(sampleApplication)
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.data).to.have.property('ApplicationID')
                    done();
                })
        });
        it('should error when creating an application for a student - Job doesnt exist', function (done) {
            sampleApplication.RecruiterID = createdRecruiterId;
            sampleApplication.StudentID = createdStudentId;
            sampleApplication.JobID = -1;
            request(app)
                .post('/action/student/createApplication')
                .send(sampleApplication)
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                })
        });
        it('should error when creating an application for a student - Recruiter doesnt exist', function (done) {
            sampleApplication.RecruiterID = -1;
            sampleApplication.StudentID = createdStudentId;
            sampleApplication.JobID = createdJobId;
            request(app)
                .post('/action/student/createApplication')
                .send(sampleApplication)
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                })
        });
        it('should error when creating an application for a student - Student doesnt exist', function (done) {
            sampleApplication.RecruiterID = createdRecruiterId;
            sampleApplication.StudentID = -1;
            sampleApplication.JobID = createdJobId;
            request(app)
                .post('/action/student/createApplication')
                .send(sampleApplication)
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                })
        })
        it('should error when creating an application for a student - Missing FK', function (done) {
            sampleApplication.RecruiterID = null;
            sampleApplication.StudentID = null;
            sampleApplication.JobID = createdJobId;
            request(app)
                .post('/action/student/createApplication')
                .send(sampleApplication)
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                })
        })
        it('should update an application for a student - Status update', function (done) {
            const updatedData = { Status: 'ACCEPT'};
            request(app)
                .put('/action/student/updateApplication')
                .send({ ApplicationID: createdApplicationId, updatedData: updatedData })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.Status).to.equal('ACCEPT');
                    done();
                });
        })
        it('should update an application for a student - Submitted Documents', function (done) {
            const updatedData = {
                SubmittedDocuments: {
                    Resume: "RESUME2.txt",
                    CoverLetter: "COVERLETTER2.txt",
                    EnglishSample: "ENGLISHSAMPLE2.txt"
                }};
            request(app)
                .put('/action/student/updateApplication')
                .send({ ApplicationID: createdApplicationId, updatedData: updatedData })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.SubmittedDocuments.Resume).to.equal('RESUME2.txt');
                    done();
                });
        })
        it('should not update an application for a student - No data sent', function (done) {
            const updatedData = {};
            request(app)
                .put('/action/student/updateApplication')
                .send({ ApplicationID: createdApplicationId, updatedData: updatedData })
                .expect(404)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.message).to.equal('Application not found or nothing updated');
                    done();
                });
        })
        it('should not update an application for a student - Same data sent', function (done) {
            const updatedData = {Status: 'ACCEPT'};
            request(app)
                .put('/action/student/updateApplication')
                .send({ ApplicationID: createdApplicationId, updatedData: updatedData })
                .expect(404)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.message).to.equal('Application not found or nothing updated');
                    done();
                });
        })
        it('should error when updating application for a student - FK doesnt exist', function (done) {
            const updatedData = {JobID: '-1'};
            request(app)
                .put('/action/student/updateApplication')
                .send({ ApplicationID: createdApplicationId, updatedData: updatedData })
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                });
        })
        it('should error when updating application for a student - Status doesnt exist', function (done) {
            const updatedData = {Status: 'FREAKY'};
            request(app)
                .put('/action/student/updateApplication')
                .send({ ApplicationID: createdApplicationId, updatedData: updatedData })
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                });
        })
        it('should find that the student has all required documents - returns true', function (done) {
            request(app)
                .get('/action/student/checkEligibility')
                .send({JobID: createdJobId, ApplicationID: createdApplicationId})
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.equal(true)
                    done()
                })
        })
        it('should find that the student does not have all required documents - returns false', function (done) {
            const updatedData = {
                SubmittedDocuments: {
                    Resume: "RESUME2.txt"
                }};
            request(app)
                .put('/action/student/updateApplication')
                .send({ ApplicationID: createdApplicationId, updatedData: updatedData })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                })
            request(app)
                .get('/action/student/checkEligibility')
                .send({JobID: createdJobId, ApplicationID: createdApplicationId})
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.equal(false)
                    done();
                })
        })
        it('should error when checking required documents - JobID doesnt exist', function (done) {
            request(app)
                .get('/action/student/checkEligibility')
                .send({JobID: -1, ApplicationID: createdApplicationId})
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                })
        })
        it('should not find an application to delete', function (done) {
            request(app)
                .delete('/action/student/deleteApplication')
                .send({deleteID: -1})
                .expect(404)
                .end((err,res) => {
                    if (err) return done(err);
                    done();
                })
        })
        it('should error when deleting application', function (done) {
            request(app)
                .delete('/action/student/deleteApplication')
                .send({Location: "North Pole"})
                .expect(400)
                .end((err,res) => {
                    if (err) return done(err);
                    done();
                })
        })
        it('should get all applications', function (done) {
            request(app)
                .get('/action/student/getApplications')
                .send({StudentID: createdStudentId})
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    res.body.data.forEach(application => {
                        expect(application).to.have.property('ApplicationID');
                    });
                    done();
                })
        })
        it('should not find a student when getting all applications - student doesnt exist', function (done) {
            request(app)
                .get('/action/student/getApplications')
                .send({StudentID: -1})
                .expect(404)
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                })
        })
        it('should error when getting all applications - StudentID not present', function (done) {
            request(app)
                .get('/action/student/getApplications')
                .send({})
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                })
        })

        after(function (done) {
            request(app)
                .delete('/action/student/deleteApplication')
                .send({deleteID: createdApplicationId})
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.message).to.equal("Successfully deleted application")
                    request(app)
                        .delete('/action/recruiter/deleteJobPosting')
                        .send({jobID: createdJobId})
                        .expect(200)
                        .end((err, res) => {
                            if (err) return done(err);
                            expect(res.body.message).to.equal("Successfully deleted job")
                            request(app)
                                .delete('/account/student/delete')
                                .send({deleteID: createdStudentId})
                                .expect(200)
                                .end((err, res) => {
                                    if (err) return done(err);
                                    expect(res.body.message).to.equal('Successfully deleted student');
                                    request(app)
                                        .delete('/account/recruiter/delete')
                                        .send({ deleteID: createdRecruiterId })
                                        .expect(200)
                                        .end((err, res) => {
                                            if (err) return done(err);
                                            expect(res.body.message).to.equal('Successfully deleted recruiter');
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
                        });
                })
        });
    });
});
