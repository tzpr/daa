
const Code = require('code'); //https://github.com/hapijs/code
const Lab = require('lab'); //https://github.com/hapijs/lab
const lab = exports.lab = Lab.script();


const describe = lab.describe;
const it = lab.it;
const before = lab.before;
const after = lab.after;
const expect = Code.expect;

const server = require("../server.js");


describe('just dummy test testing', () => {

    it('returns true when 1 + 1 equals 2', (done) => {
        expect(1 + 1).to.equal(2);
        done();
    });
});



describe('api POST requests', () => {

    it('saves valid observation object', (done) => {
        const options = {
            method: 'POST',
            url: '/observation',
            payload: {
                species: 'Räyskä',
                count: 1,
                state: "p"
            }
        };
        server.inject(options, (response) => {
            expect(response.statusCode).to.equal(201);
            done();
        });
    });

    it('returns validation error when observation has invalid state', (done) => {
        const options = {
            method: 'POST',
            url: '/observation',
            payload: {
                species: 'Räyskä',
                count: 1,
                state: "Gh"
            }
        };
        server.inject(options, (response) => {
            expect(response.statusCode).to.equal(400);
            done();
        });
    });

    it('returns validation error when observation is missing mandatory count attribute', (done) => {
        const options = {
            method: 'POST',
            url: '/observation',
            payload: {
                species: 'Räyskä',
                state: "p"
            }
        };
        server.inject(options, (response) => {
            expect(response.statusCode).to.equal(400);
            done();
        });
    });

    it('returns validation error when observation is missing mandatory species attribute', (done) => {
        const options = {
            method: 'POST',
            url: '/observation',
            payload: {
                count: 100,
                state: "p"
            }
        };
        server.inject(options, (response) => {
            expect(response.statusCode).to.equal(400);
            done();
        });
    });

    it('returns validation error when observation is missing mandatory state attribute', (done) => {
        const options = {
            method: 'POST',
            url: '/observation',
            payload: {
                species: 'Räyskä',
                count: 100
            }
        };
        server.inject(options, (response) => {
            expect(response.statusCode).to.equal(400);
            done();
        });
    });

    it('returns validation error when observation count attribute is not number', (done) => {
        const options = {
            method: 'POST',
            url: '/observation',
            payload: {
                species: 'Räyskä',
                count: 'NotNumber',
                state: "p"
            }
        };
        server.inject(options, (response) => {
            expect(response.statusCode).to.equal(400);
            done();
        });
    });

    it('returns validation error when observation species attribute is not a string', (done) => {
        const options = {
            method: 'POST',
            url: '/observation',
            payload: {
                species: 1234,
                count: 1,
                state: "p"
            }
        };
        server.inject(options, (response) => {
            expect(response.statusCode).to.equal(400);
            done();
        });
    });

    it('returns validation error when observation species attribute value is too short', (done) => {
        const options = {
            method: 'POST',
            url: '/observation',
            payload: {
                species: 'Py',
                count: 12,
                state: "p"
            }
        };
        server.inject(options, (response) => {
            expect(response.statusCode).to.equal(400);
            done();
        });
    });
});


describe('api GET requests', () => {

    it('returns observations by the given year', (done) => {
        const year = 2017;
        const options = {
            method: "GET",
            url: "/observation/" + year + "/year"
        };
        // server.inject lets you simulate an http request
        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(200);
            server.stop(done); // done() callback is required to end the test.
        });
    });

    it('returns validation error if too short year parameter is used', (done) => {
        const year = 96;
        const options = {
            method: "GET",
            url: "/observation/" + year + "/year"
        };

        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(400);
            server.stop(done);
        });
    });

    it('returns validation error if too small year parameter value is used', (done) => {
        const year = 1999;
        const      options = {
            method: "GET",
            url: "/observation/" + year + "/year"
        };

        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(400);
            server.stop(done);
        });
    });

    it('returns validation error if too big year parameter value is used', (done) => {
        const year = 2021;
        const options = {
            method: "GET",
            url: "/observation/" + year + "/year"
        };

        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(400);
            server.stop(done);
        });
    });

    it('returns validation error if non numeric year parameter is used', (done) => {
        const year = 'daad';
        const options = {
            method: "GET",
            url: "/observation/" + year + "/year"
        };

        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(400);
            server.stop(done);
        });
    });

    // not sure if this is what we want. 404 would be better...
    it('returns error if invalid id is used', (done) => {
        const id = 'daad';
        const options = {
            method: "GET",
            url: "/observation/" + id + "/id"
        };

        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(500);
            server.stop(done);
        });
    });
});
