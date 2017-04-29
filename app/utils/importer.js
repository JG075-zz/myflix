var infoFetcher = require('../helpers/infoFetcher');
var mongoose = require('mongoose');
var config = require('../../config/config');
var Movie = require('../models/movie');
var fs = require('fs');

function validateJSON(body) {
  try {
    var data = JSON.parse(body);
    return data;
  } catch(e) {
    return null;
  }
}

function updateAndSave(done) {
  parsedFile.forEach(function(item) {
    infoFetcher.fetch(item.title, function(updatedItem) {
      var movie = new Movie(updatedItem);
      movie.save(function(error) {
        if(error) throw new Error(error);
      });
    });
  });
  done();
}

function getDocumentCount(done) {
  Movie.count({}, function(err, count) {
    if (err) throw err;
    done(count);
  });
}

function importer(file) {
  parsedFile = validateJSON(file);
  if (!parsedFile) throw new Error('No file or wrong type given');
  if (!(parsedFile instanceof Array)) throw new Error('Empty or not a JSON array');

  getDocumentCount(function(count) {
    updateAndSave(function(){

    });
  });


}

module.exports = importer;

// run the importer when called from the command line
if (require.main === module) {
  mongoose.connect(config.db);
  mongoose.connection.on('error', function(err){
    if (err) throw err;
  });

  var imported = fs.readFileSync(process.argv[2], 'utf8');
  importer(imported);
}
