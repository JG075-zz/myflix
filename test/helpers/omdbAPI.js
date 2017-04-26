var assert = require('chai').assert,
    nock = require('nock'),
    OmdbAPI = require('../../app/helpers/omdbAPI');

var omdbAPI = new OmdbAPI();

describe('Omdb', function() {
  beforeEach(function() {
    var omdbResponse = { Title: 'Oz',
      Year: '1997–2003',
      Rated: 'TV-MA',
      Released: '12 Jul 1997',
      Runtime: '55 min',
      Genre: 'Crime, Drama, Romance',
      Director: 'N/A',
      Writer: 'Tom Fontana',
      Actors: 'Ernie Hudson, J.K. Simmons, Lee Tergesen, Dean Winters',
      Plot: 'A series chronicling the daily activities of an unusual prison facility and its criminal inhabitants.',
      Language: 'English',
      Country: 'USA',
      Awards: 'Nominated for 2 Primetime Emmys. Another 14 wins & 51 nominations.',
      Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BOTAxOTg2ODM3MF5BMl5BanBnXkFtZTgwMjIyMzgwMzE@._V1_SX300.jpg',
      Metascore: 'N/A',
      imdbRating: '8.8',
      imdbVotes: '70,385',
      imdbID: 'tt0118421',
      Type: 'series',
      totalSeasons: '6',
      Response: 'True'
    };

    nock('http://www.omdbapi.com')
      .get('/?t=Oz')
      .reply(200, omdbResponse);
  });

  it('should instatiate a new object', function() {
    assert.isObject(omdbAPI);
  });

  describe('#get()', function() {

    it('should return an object', function(done) {
      omdbAPI.get('Oz', function(data) {
        assert.isObject(data);
        done();
      });
    });

    it('should have a \'rating\' property', function(done){
      omdbAPI.get('Oz', function(data) {
        assert.notTypeOf(data.imdbRating, 'undefined');
        done();
      });
    });

  });

});
