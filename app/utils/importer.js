var infoFetcher = require('../helpers/infoFetcher'),
    mongoose = require('mongoose'),
    config = require('../../config/config'),
    Movie = require('../models/movie'),
    fs = require('fs');

function validateJSON(body) {
  try {
    var data = JSON.parse(body);
    return data;
  } catch(e) {
    return null;
  }
}

function updateAndSave(file, done) {
  file.forEach(function(item) {
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
  var parsedFile = validateJSON(file);
  if (!parsedFile) throw new Error('No file or wrong type given');
  if (!(parsedFile instanceof Array)) throw new Error('Empty or not a JSON array');

  getDocumentCount(function(count) {
    var beforeCount = count;
    updateAndSave(parsedFile, function(){
      getDocumentCount(function(count) {
        if(require.main === module){ // print results when called from the command line
          console.log('Import complete - Documents before: ' + beforeCount + ', after: ' + count);
        }
      });
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
