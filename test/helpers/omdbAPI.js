var expect = require('chai').expect,
    sinon = require('sinon'),
    proxyquire = require('proxyquire'),
    omdbAPI = require('../../app/helpers/omdbAPI'),
    testHelpers = require('../testHelpers');

describe('Omdb', function() {

  var movie = { title: 'Toy Story 3', year: '2012' };
  var omdbAPI, requestStub;

  beforeEach(function() {
    requestStub = sinon.stub();
    requestStub.yields(null, null, JSON.stringify(testHelpers.createImdbReponse(movie)));
    omdbAPI = proxyquire('../../app/helpers/omdbAPI', { 'requestretry': requestStub });
  });

  describe('#get()', function() {

    it('should give back the fake IMDB response', function(done){
      omdbAPI.get('Toy Story 3', function(err, data) {
        expect(JSON.stringify(data)).to.eq(JSON.stringify(testHelpers.createImdbReponse(movie)));
        done();
      });
    });

    it('should pass request the api url, title, and year when year is given', function(done) {
      omdbAPI.get('Toy Story 3', '2012', function(err, data) {
        expect(requestStub.args[0][0].url).to.eql('http://www.omdbapi.com/?t=Toy Story 3&y=2012');
        done();
      });
    });

    it('should not append a year when none is given', function(done) {
      omdbAPI.get('Toy Story 3', function(err, data) {
        expect(requestStub.args[0][0].url).to.eql('http://www.omdbapi.com/?t=Toy Story 3');
        done();
      });
    });

    it('should give the callback the error received from request', function(done) {
      requestStub.yields(new Error('Not found'), null, null);
      omdbAPI.get('Toy Story 3', function(err, data) {
        expect(err).to.exist;
        done();
      });
    });

    it('should give the callback the error received from OmdbAPI', function(done) {
      var error = { Response : "False", Error : "Movie not found!" };
      requestStub.yields(null, null, JSON.stringify(error));
      omdbAPI.get('Toy Story 3', function(err, data) {
        expect(JSON.stringify(err)).to.eql(JSON.stringify(error));
        done();
      });
    });

  });

});
