var expect = require('chai').expect,
    sinon = require('sinon'),
    request = require('supertest'),
    app = require('../../app');

describe('API Route', function() {

  describe('/api', function(done) {
    it('should result in a 200 response', function() {
      request(app)
        .get('/api/')
        .expect(200, "ok")
        .end(function(err, res){
           if (err) throw err;
           done();
        });
    });
  });

  describe('/api/movies', function() {
    it('should return a JSON object', function(done){
      request(app)
        .get('/api/movies')
        .expect(200, "ok")
        .expect('Content-Type', /json/)
        .end(function(err, res){
           if (err) throw err;
           done();
        });
    });
  });

});
