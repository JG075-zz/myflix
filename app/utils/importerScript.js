var mongoose = require('mongoose'),
    fs = require('fs'),
    config = require('../../config/config'),
    importer = require('../helpers/importer');

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
  if (err) console.log(err);

  console.log('Import complete - Documents before: ' + results.beforeCount + ', after: ' + results.afterCount + ', added: ' + results.added);
  console.log('Failed movies: ' + JSON.stringify(results.failedMovies));
  process.exit();
});
