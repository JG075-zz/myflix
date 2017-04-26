var infoFetcher = require('../helpers/infoFetcher'),
    movieModel = require('../models/movie'),
    fs = require('fs');

function validateJSON(body) {
  try {
    var data = JSON.parse(body);
    return data;
  } catch(e) {
    return null;
  }
}

function importer(file) {
  parsedFile = validateJSON(file);
  if (!parsedFile) throw new Error('No file or wrong type given');
  if (!(parsedFile instanceof Array)) throw new Error('Empty or not a JSON array');
}

module.exports = importer;

if (require.main === module) {
  var imported = fs.readFileSync(process.argv[2], 'utf8');
  importer(imported);
}
