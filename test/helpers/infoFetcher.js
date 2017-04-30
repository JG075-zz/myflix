var expect = require('chai').expect,
    proxyquire =  require('proxyquire'),
    sinon = require('sinon'),
    testHelpers = require('../testHelpers');

describe('InfoFetcher', function() {

  var fakeOmdbAPI, infoFetcher;

  beforeEach(function() {
    fakeOmdbAPI = function() {};
    fakeOmdbAPI.prototype.get = sinon.spy(function(title, done){
      done(testHelpers.imdbResponse);
    });
    infoFetcher = proxyquire('../../app/helpers/infoFetcher', { './omdbAPI': fakeOmdbAPI });
  });

  describe('#fetch()', function(){

    it('should exist', function(){
      expect(infoFetcher.fetch).to.exist;
    });

    it('should pass the title to omdb request', function(done) {
      infoFetcher.fetch('hood', function(){
        expect(fakeOmdbAPI.prototype.get.args[0][0]).to.eql('hood');
        done();
      });
    });

    it('should give the function called in a formatted movie object', function(done) {
      infoFetcher.fetch('Toy Story 3', function(movie) {
        expect(JSON.stringify(movie)).to.eq(JSON.stringify(testHelpers.formattedMovie));
        done();
      });
    });

  });

});
