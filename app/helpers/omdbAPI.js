var request = require('request');

function OmdbAPI() {}

OmdbAPI.prototype.get = function (title, done) {
  var omdbRequest = 'http://www.omdbapi.com/?t=' + title;
  request(omdbRequest, function (err, response, body) {
    if (err) throw err;
    done(JSON.parse(body.toString()));
  });
};

module.exports = OmdbAPI;
