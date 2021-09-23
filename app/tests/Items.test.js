const request = require("supertest");
const assert = require("assert");

const app=require('../index').app;

describe('GET /api/items', () => {
    it('list of all items', (done) => {
        request(app)
            .get('/api/items')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
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

describe('GET /api/items/:id', () => {
    it('single item', (done) => {
        request(app)
            .get('/api/items/1')
            .set('Accept', 'application/json')
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

describe('PUT /api/items/:id', () => {
it("updateItems", function(done){
    request(app)
        .put('/api/items/1')
        .set('Accept','application/json')
        .send({ "title":"ggg", "price":"1" })
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

