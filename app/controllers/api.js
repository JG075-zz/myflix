var Movie = require('../models/movie');

exports.index = function(req, res) {
  return res.send('ok');
};

exports.movies = function(req, res) {
  var limit = 20;
  var page = req.query.hasOwnProperty('page') ? req.query.page - 1 : 0;

  Movie.find().sort('-released').skip(page * limit).limit(limit).exec(function(error, movies) {
    if (error) {
      return res.send(400, {
        message: error
      });
    }

    res.send(movies);
  });
};
