// exports a singleton
// .fetch() takes a movie title
// returns an object with updated values ready to be saved

function InfoFetcher() {
  this.omdbAPI = require('./omdbAPI');
}

InfoFetcher.prototype.fetch = function (title, done) {
  this.omdbAPI.get(title, function(movie) {
    done(movie);
  });
};

module.exports = new InfoFetcher();
