const request = require("supertest");
const assert = require("assert");
const app=require('../index').app;

describe('POST api/register', () => {
it("register", function(done){
    request(app)
        .post('/api/register')
        .send({	"email":"kirill@gmail.com", "name":"rr","password":"123456"})
        .expect(200)
        .end(function(err, res) {
            if (err) {
                assert(false, err.message);
                return;
            }
            done();
        });
});
});

describe('POST /api/login', () => {
it("login", function(done){
    request(app)
        .post('/api/login')
        .set('Accept','application/json')
        .send({ "email":"kirill@gmail.com", "password":"123456" })
        .expect(200)
        .end(function(err, res) {
            if (err) {
                assert(false, err.message);
                return;
            }
            done();
        });
});
});