var express = require('express'),
  router = express.Router(),
  apiController = require('../controllers/api');

module.exports = function (app) {
  app.use('/api', router);
};

router.get('/', apiController.index);
router.get('/movies', apiController.movies);
//router.get('/movies/:title', apiController.movieT);
