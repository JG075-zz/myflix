var omdbAPI = require('./omdbAPI');

function InfoFetcher() {
  this.omdbAPI = new omdbAPI();
}

InfoFetcher.prototype.formatMovie = function (movie) {
  if (movie.Response == 'False') return movie;
  return {
    title: movie.Title,
    released: movie.Released,
    rated: movie.Rated,
    runtime: movie.Runtime,
    genre: movie.Genre,
    director: movie.Director,
    writer: movie.Writer,
    actors: movie.Actors,
    plot: movie.Plot,
    language: movie.Language,
    country: movie.Country,
    poster: movie.Poster,
    ratings: {
      meta_score: movie.Metascore,
      imdb_rating: movie.imdbRating,
      rotten_tomatoes: movie.Ratings[1].Value
    },
    imdb_id: movie.imdbID,
    type: movie.Type,
  };
};

InfoFetcher.prototype.fetch = function (title, done) {
  var _this = this;
  this.omdbAPI.get(title, function(movie) {
    var formattedMovie = _this.formatMovie(movie);
    done(formattedMovie);
  });
};

module.exports = new InfoFetcher();
