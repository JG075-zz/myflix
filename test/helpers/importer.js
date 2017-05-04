var expect = require('chai').expect,
    sinon = require('sinon'),
    proxyquire = require('proxyquire'),
    mongoSetup = require('../mongoSetup'),
    Movie = require('../../app/models/movie'),
    testHelpers = require('../testHelpers');

describe('Importer', function() {

  var movies = [{title: "Forest Gump", year: '2010'},{title: 'Madagascar', year: '2004'}, {title : 'Inception', year: '2008'}];
  var importer, omdbStub;

  beforeEach(function() {
    omdbStub = { get: sinon.stub() };
    omdbStub.get.withArgs(movies[0].title).yields(null, testHelpers.createImdbReponse(movies[0]));
    omdbStub.get.withArgs(movies[1].title).yields(null, testHelpers.createImdbReponse(movies[1]));
    omdbStub.get.withArgs(movies[2].title).yields(null, testHelpers.createImdbReponse(movies[2]));

    importer = proxyquire('../../app/helpers/importer', { './omdbAPI': omdbStub });
  });

  it('should throw an error if the first argument is not an array', function() {
    expect(importer.bind(undefined, 'string')).to.throw(Error, 'Expected "movies" to be an array but received "string"');
  });

  it('should throw an error if the array given is empty', function() {
    var emptyMovies = [];
    expect(importer.bind(undefined, [])).to.throw('"movies" should not be empty');
  });

  it('should save non-duplicate, valid, movies to a database', function(done) {
    importer(movies, function() {
      Movie.find({}, function(err, movies) {
        expect(movies.length).to.eq(3);
        done();
      });
    });
  });

  it('should give the database "before length" to the callback', function(done) {
    importer(movies, function(err, results) {
      expect(results.beforeCount).to.eq(0);
      done();
    });
  });

  it('should give the database "after length" to the callback', function(done) {
    importer(movies, function(err, results) {
      expect(results.afterCount).to.eq(3);
      done();
    });
  });

  it('should give "added" documents to the callback', function(done) {
    importer(movies, function(err, results) {
      expect(results.added).to.eq(3);
      done();
    });
  });

  it('should give back failed movies that recieve an error from OmdbAPI', function(done) {
    omdbStub.get.withArgs(movies[0].title).yields({"Response":"False","Error":"Movie not found!"}, null);
    importer(movies, function(err, results) {
      Movie.find({}, function(err, movies) {
        expect(JSON.stringify(results.failedMovies[0])).to.
          eq(JSON.stringify({title: 'Forest Gump', error: { "Response":"False","Error":"Movie not found!" }}));
        expect(movies.length).to.eq(2);
        done();
      });
    });
  });


});
