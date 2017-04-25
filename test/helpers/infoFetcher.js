var expect = require('chai').expect,
    proxyquire =  require('proxyquire'),
    sinon = require('sinon');

describe('InfoFetcher', function() {

  var fakeOmdbAPI, infoFetcher;

  beforeEach(function() {
    fakeOmdbAPI = { get: sinon.spy() };
    infoFetcher = proxyquire('../../app/helpers/infoFetcher', { './omdbAPI': fakeOmdbAPI });
  });

  describe('#fetch()', function(){

    it('should exist', function(){
      expect(infoFetcher.fetch).to.exist;
    });

    it('should pass the title to omdb request', function() {
      infoFetcher.fetch('movie');
      expect(fakeOmdbAPI.get.args[0][0]).to.eql('movie');
    });

    it('should give the function called in a movie object', function(done) {
      var fakeMovie = { title: "movie", released: "09/05/1998" };
      fakeOmdbAPI = { get: function(title, done) {
        done(fakeMovie);}
      };
      infoFetcher = proxyquire('../../app/helpers/infoFetcher', { './omdbAPI': fakeOmdbAPI });
      infoFetcher.fetch('movie', function(movie) {
        expect(movie).to.eq(fakeMovie);
        done();
      });

    });

  });

});
