var assert = require('chai').expect;
var Movie = require('../../app/models/movies');

describe('Movie', function() {
  var movies;

  beforeEach(function(){
    movies = new Movie();
  });

  it('should not accept empty required fields');
  it('should not accept invalid string entries');
  it('should not accept invalid number entries');
  it('should not accept invalid date entries');
  it('should not accept out of range meta_score');
  it('should not accept out of range imdb_rating');
  it('should have a correct date');
  it('should accept valid entries');

});
