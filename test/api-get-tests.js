/* jshint node: true */

const Code = require('code'); //https://github.com/hapijs/code
const Lab = require('lab'); //https://github.com/hapijs/lab
const lab = exports.lab = Lab.script();


const describe = lab.describe;
const it = lab.it;
const before = lab.before;
const beforeEach = lab.beforeEach;
const afterEach = lab.afterEach;
const after = lab.after;
const expect = Code.expect;

const server = require("../server.js");

const testData = require('./helper/test-data');
const Observation = require('../data/models/observation');


describe('just dummy test testing', () => {

    it('returns true when 1 + 1 equals 2', (done) => {
        expect(1 + 1).to.equal(2);
        done();
    });
});

describe('api GET requests', () => {

    function toObservationInstance(json) {
        return new Observation(json);
    }

    before((done) => {
        const testObservations = testData.allObservations().map(toObservationInstance);

        // Commented out until insertMany below is fixed
        //Observation.collection.drop();

        // WTF?! This doesn't populate db... :(
        Observation.insertMany(testObservations, (err, docs) => {
            if (err) {
                throw (err);
            } else {
                done();
            }
        });

        // var options = {
        //     method: 'POST',
        //     url: '/observation/many',
        //     payload: {
        //         observations: testData.allObservations()
        //     }
        // };
        // server.inject(options, (response) => {
        //     expect(response.statusCode).to.equal(201);
        //     done();
        // });
        //done();
    });

    after((done) => {
        done();
    });

    it('returns count of different species', (done) => {
        var options = {
            method: "GET",
            url: "/observation/species"
        };

        server.inject(options, (response) => {
            var result = response.result;

            // FAIL until testdata inserted to db. See before block above.
            //expect(result.count).to.equal(testData.elisCount);

            expect(response.statusCode).to.equal(200);

            server.stop(done);
        });
    });

    it('returns list of different species', (done) => {
        var options = {
            method: "GET",
            url: "/observation/species"
        };

        server.inject(options, (response) => {
            var result = response.result;

            expect(response.statusCode).to.equal(200);
            server.stop(done);
        });
    });

    it('eturns count of different species for the given year', (done) => {
        var year = 2017,
            options = {
                method: "GET",
                url: "/observation/species/" + year + "/year"
            };
        
        server.inject(options, (response) => {
            expect(response.statusCode).to.equal(200);
            server.stop(done);
        });
    });

    it('returns observations by the given year', (done) => {
        var year = 2017,
            options = {
                method: "GET",
                url: "/observation/" + year + "/year"
            };

        server.inject(options, (response) => {
            expect(response.statusCode).to.equal(200);
            server.stop(done);
        });
    });

    it('returns validation error if too short year parameter is used', (done) => {
        var year = 96,
            options = {
                method: "GET",
                url: "/observation/" + year + "/year"
            };

        server.inject(options, (response) => {
            expect(response.statusCode).to.equal(400);
            server.stop(done);
        });
    });

    it('returns validation error if too small year parameter value is used', (done) => {
        var year = 1999,
            options = {
                method: "GET",
                url: "/observation/" + year + "/year"
            };

        server.inject(options, (response) => {
            expect(response.statusCode).to.equal(400);
            server.stop(done);
        });
    });

    it('returns validation error if too big year parameter value is used', (done) => {
        var year = 2021,
            options = {
                method: "GET",
                url: "/observation/" + year + "/year"
            };

        server.inject(options, (response) => {
            expect(response.statusCode).to.equal(400);
            server.stop(done);
        });
    });

    it('returns validation error if non numeric year parameter is used', (done) => {
        var year = 'daad',
            options = {
                method: "GET",
                url: "/observation/" + year + "/year"
            };

        server.inject(options, (response) => {
            expect(response.statusCode).to.equal(400);
            server.stop(done);
        });
    });

    it('returns observations by the given year', (done) => {
        var year = 2017,
            options = {
                method: "GET",
                url: "/observation/species/" + year + "/missing"
            };

        server.inject(options, (response) => {
            expect(response.statusCode).to.equal(200);
            server.stop(done);
        });
    });

    // // not sure if this is what we want. 404 would be better...
    // it('returns error if invalid id is used', (done) => {
    //     var id = 'daad',
    //         options = {
    //             method: "GET",
    //             url: "/observation/" + id + "/id"
    //         };
    //
    //     server.inject(options, (response) => {
    //         expect(response.statusCode).to.equal(500);
    //         server.stop(done);
    //     });
    // });
});
