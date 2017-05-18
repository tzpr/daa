const Code = require('code');   // assertion library
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

    const responseData =
          '[{name: "Kangaskiuru", year: 2017, location: {lat: 23.34322, lng: 32.3456}}]'


    it('returns observations by the given year', (done) => {

        const year = 2017;
		    const options = {
			      method: "GET",
			      url: "/observations/" + year
		    };

		    // server.inject lets you simulate an http request
		    server.inject(options, function(response) {
		  	    expect(response.statusCode).to.equal(200);
			      expect(response.result).to.equal(responseData);
			      server.stop(done);  // done() callback is required to end the test.
		    });
	  });
});