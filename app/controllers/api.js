var Movie = require('../models/movie');

exports.index = function(req, res) {
  return res.send('ok');
};

exports.movies = function(req, res) {
  // give back a json array of movie objects
  // should be limited to the first page e.g. first 20 results
  // should be sorted by release date (newest - oldest)
  
  Movie.find().sort('released').exec(function(error, movies) {
    if (error) {
      return res.send(400, {
        message: error
      });
    }

    res.send(movies);

  });
};
