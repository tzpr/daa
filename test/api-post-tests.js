const Code = require('code'); //https://github.com/hapijs/code
const Lab = require('lab'); //https://github.com/hapijs/lab
const lab = exports.lab = Lab.script();


const describe = lab.describe;
const it = lab.it;
const before = lab.before;
const after = lab.after;
const expect = Code.expect;

const server = require("../server.js");


describe('api POST requests', () => {

    it('saves valid observation object', (done) => {
        var options = {
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
        var options = {
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
        var options = {
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
        var options = {
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
        var options = {
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
        var options = {
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
        var options = {
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
        var options = {
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
