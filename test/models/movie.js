var expect = require('chai').expect;
var Movie = require('../../app/models/movie');

describe('Movie', function() {

  it('should not accept empty required fields', function(done){
    var movie = new Movie();

    movie.validate(function(err) {
      expect(err.errors.title).to.exist;
      expect(err.errors.released).to.exist;
      expect(err.errors.rated).to.exist;
      expect(err.errors.runtime).to.exist;
      expect(err.errors.genre).to.exist;
      expect(err.errors.director).to.exist;
      expect(err.errors.writers).to.exist;
      expect(err.errors.actors).to.exist;
      expect(err.errors.plot).to.exist;
      expect(err.errors.language).to.exist;
      expect(err.errors.poster).to.exist;
      expect(err.errors['ratings.rotten_tomatoes']).to.exist;
      expect(err.errors['ratings.imdb_rating']).to.exist;
      expect(err.errors['ratings.meta_score']).to.exist;
      expect(err.errors.imdb_id).to.exist;
      expect(err.errors.type).to.exist;
      done();
    });
  });

  it('should not accept rating values exceeding the limit', function(done){
    var movie = new Movie({
      'ratings.meta_score': 101,
      'ratings.imdb_rating': 11,
      'ratings.rotten_tomatoes': 101,
    });
    movie.validate(function(err) {
      expect(err.errors['ratings.meta_score']).to.exist;
      expect(err.errors['ratings.imdb_rating']).to.exist;
      expect(err.errors['ratings.rotten_tomatoes']).to.exist;
      done();
    });
  });

  it('should not accept rating values under the limit', function(done){
    var movie = new Movie({
      'ratings.meta_score': -1,
      'ratings.imdb_rating': -1,
      'ratings.rotten_tomatoes': -1,
    });
    movie.validate(function(err) {
      expect(err.errors['ratings.meta_score']).to.exist;
      expect(err.errors['ratings.imdb_rating']).to.exist;
      expect(err.errors['ratings.rotten_tomatoes']).to.exist;
      done();
    });
  });

  it('should accept valid entries', function(done){
    var movie = new Movie({
      title: 'Test',
      released: '01/02/1983',
      rated: 'PG',
      runtime: '162 mins',
      genre: 'Action',
      director: 'John Doe',
      writers: 'Jane Doe',
      actors: 'Foo, Bar, Baz',
      plot: 'Test',
      language: 'English',
      country: 'United Kingdom',
      poster: 'http://example.com/img.jpg',
      ratings: {
        meta_score: 58,
        imdb_rating: 6.6,
        rotten_tomatoes: 88,
      },
      imdb_id: '001',
      type: 'Movie',
    });

    movie.validate(function(err) {
      expect(err).to.be.null;
      done();
    });
  });

});
