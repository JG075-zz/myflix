var mongoose = require('mongoose'),
fs = require('fs'),
config = require('../../config/config'),
logger = require('./logger'),
importer = require('../helpers/importer'),
async = require('async');

mongoose.Promise = global.Promise;
mongoose.connect(config.db);

mongoose.connection.on('error', function(err){
  if (err) throw err;
});

var imported = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));

// Attempts to get the year from the title
imported.forEach(function(movie, index, arr) {
  var year = movie.title.match(/\(([^)]+)\)/);
  if (year !== null && !isNaN(year[1])) {
    movie.title = movie.title.replace(year[0], '');
    arr[index].year = year[1];
  }
});

importer(imported, function(err, results) {
  if (err) logger.error(err);
  logger.info('Import complete - Documents before: ' + results.beforeCount + ', after: ' + results.afterCount + ', added: ' + results.added);

  var file = fs.createWriteStream('imports/failed/' + Date() + '.txt');
  file.on('error', function(err) { logger.error(err); });

  async.each(results.failedMovies, function(movie, callback) {
    file.write(JSON.stringify(movie) + '\n');
    callback();
  }, function(err) {
    if (err) logger.error(err);

    file.end();
    setTimeout(function(){
      process.exit();
    }, 3000);
  });

});
