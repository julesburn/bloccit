const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

//#1

  describe("GET /", () => {

//#2
    it("should return status code 200", (done) => {

//#3
      request.get(base, (err, res, body) => {
	    expect(res.statusCode).toBe(200);
		done();
		});

//#4 
    it("should return the string polo", (done) => {
	
//#5 
      request.get(base, (err, res, body) => {
	    expect(body).toBe("polo");
		done();
	   });
	  });

	});
  });
