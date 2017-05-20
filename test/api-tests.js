const Code = require('code'); // assertion library
const Lab = require('lab');
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


describe('api GET requests', () => {

    it('returns observations by the given year', (done) => {

        const year = 2017;
        const options = {
            method: "GET",
            url: "/observations/" + year
        };

        // server.inject lets you simulate an http request
        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(200);
            expect(response.result.name).to.equal('Harakka');
            server.stop(done); // done() callback is required to end the test.
        });
    });

    it('returns validation error if too short year parameter is used', (done) => {
        const year = 96;
        const options = {
            method: "GET",
            url: "/observations/" + year
        };

        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(400);
            server.stop(done);
        });
    });

    it('returns validation error if too small year parameter value is used', (done) => {
        const year = 1999;
        const options = {
            method: "GET",
            url: "/observations/" + year
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
            url: "/observations/" + year
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
            url: "/observations/" + year
        };

        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(400);
            server.stop(done);
        });
    });
});
