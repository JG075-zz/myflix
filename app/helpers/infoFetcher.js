var omdbAPI = require('./omdbAPI');

function InfoFetcher() {
  this.omdbAPI = new omdbAPI();
}

InfoFetcher.prototype.formatMovie = function (movie) {
  return {
          title: movie.Title,
          released: movie.Released,
          rated: movie.Rated,
          runtime: movie.Runtime,
          genre: movie.Genre,
          director: movie.Director,
          writers: movie.Writers,
          actors: movie.Actors,
          plot: movie.Plot,
          language: movie.Language,
          country: movie.Country,
          poster: movie.Poster,
          ratings: {
            meta_score: Number(movie.Metascore),
            imdb_rating:Number(movie.imdbRating),
            rotten_tomatoes: Number(movie.Ratings[1].Value.replace('%','')),
          },
          imdb_id: movie.imdbID,
          type: movie.Type,
        };
};

InfoFetcher.prototype.fetch = function (title, done) {
  var _this = this;
  this.omdbAPI.get(title, function(movie) {
    done(_this.formatMovie(movie));
  });
};

module.exports = new InfoFetcher();
