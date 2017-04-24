var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');

module.exports = function (app) {
  app.use('/api', router);
};

router.get('/', function (req, res, next) {
  res.send('api route');
});

router.get('/movies', function(req, res, next){
  if(req.query.page) {
    if(req.query.sort_by == "date_desc") {
      res.send('page: ' + req.query.page + ', sort_by: date_desc');
    }
    else if (req.query.sort_by == "date_asc") {
      res.send('page: ' + req.query.page + ', sort_by: date_asc');
    }
    else {
      res.send('page: ' + req.query.page);
    }
  } else {
    res.send('page 1');
  }
});

router.get('/movies/:title', function(req, res, next){
  if (req.params.title) res.send('movie: ' + req.params.title);
});
