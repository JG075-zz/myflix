var omdbAPI = require('./omdbAPI');

function InfoFetcher() {
  this.omdbAPI = new omdbAPI();
}

InfoFetcher.prototype.fetch = function (title, done) {
  this.omdbAPI.get(title, function(movie) {
    done(movie);
  });
};

module.exports = new InfoFetcher();
