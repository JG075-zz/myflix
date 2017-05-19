var expect = require('chai').expect,
    sinon = require('sinon'),
    request = require('supertest'),
    app = require('../../app'),
    mongoSetup = require('../mongoSetup'),
    Movie = require('../../app/models/movie'),
    testHelpers = require('../testHelpers');

describe('API Route', function() {

  describe('/api', function() {
    it('should result in a 200 response', function(done) {
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
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
           if (err) throw err;
           done();
        });
    });

    it('should have a maximum length of 20', function(done){
      Movie.collection.insert(testHelpers.generateMoviesArray(30), function(err, docs) {
        if (err) throw err;
        request(app)
          .get('/api/movies')
          .end(function(err, res){
             if (err) throw err;
             expect(res.body).to.have.length.within(1, 20);
             done();
          });
      });
    });

    it('should sort the results from newest to oldest', function(done){
      var movies = testHelpers.generateMoviesArray(10);
      movies[0].released = '04 Mar 1998';
      movies[movies.length - 1].released = '24 Jan 2017';
      Movie.collection.insert(movies, function(err, docs) {
        if (err) throw err;
        request(app)
          .get('/api/movies')
          .end(function(err, res){
             if (err) throw err;
             expect(JSON.stringify(res.body[0].released)).to.eql(JSON.stringify(new Date(2017, 0, 24)));
             expect(JSON.stringify(res.body[res.body.length - 1].released)).to.eql(JSON.stringify(new Date(1998, 2, 4)));
             done();
          });
      });
    });

  });

});
