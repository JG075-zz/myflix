var infoFetcher = require('../helpers/infoFetcher'),
    mongoose = require('mongoose'),
    config = require('../../config/config'),
    Movie = require('../models/movie'),
    fs = require('fs'),
    async = require('async');

function validateJSON(body) {
  try {
    var data = JSON.parse(body);
    return data;
  } catch(e) {
    return null;
  }
}

var failedMovies = [];

function updateAndSave(file, done) {
  async.each(file, function(item, callback) {
    infoFetcher.fetch(item.title, function(updatedItem) {
      if (updatedItem.Response == 'False') {
        failedMovies.push([item.title, updatedItem]);
        callback();
      } else {
        var movie = new Movie(updatedItem);
        movie.save(function(err) {
          if(err) throw err;
          callback();
        });
      }
    });
  }, function(err) {
    if (err) throw err;
    done();
  });
}

function getDocumentCount(done) {
    Movie.count({}, function(err, count) {
      if (err) throw err;
      done(count);
    });
}

function logFailedMovies(done) {
  if (failedMovies.length > 0) {
    var file = fs.createWriteStream('imports/failed.txt');
    file.on('error', function(err) {
      throw err;
    });
    failedMovies.forEach(function(movie) {
      file.write(movie[0] + ', ' + movie[1].Error + '\n');
    });
    file.end(function() {
      done();
    });
  } else {
    done();
  }
}

function importer(file) {
  var parsedFile = validateJSON(file);
  if (!parsedFile) throw new Error('No file or wrong type given');
  if (!(parsedFile instanceof Array)) throw new Error('Empty or not a JSON array');

  getDocumentCount(function(beforeCount) {
    updateAndSave(parsedFile, function(){
      getDocumentCount(function(afterCount) {
        logFailedMovies(function() {
          if (require.main === module) { // runs when called from the command line
            console.log('Import complete - Documents before: ' + beforeCount + ', after: ' + afterCount);
            process.exit();
          }
        });
      });
    });
  });
}

module.exports = importer;

// run the importer when called from the command line
if (require.main === module) {
  mongoose.Promise = global.Promise;
  mongoose.connect(config.db);
  mongoose.connection.on('error', function(err){
    if (err) throw err;
  });

  var imported = fs.readFileSync(process.argv[2], 'utf8');
  importer(imported);
}
