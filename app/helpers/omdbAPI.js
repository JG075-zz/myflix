var http = require('http');

function OmdbAPI() {}

OmdbAPI.prototype.request = function (url, done) {
  http.get(url, (res) => {
    res.on('data', (data) => {
      done(data);
    });

  }).on('error', (e) => {
    throw e;
  });
};

OmdbAPI.prototype.get = function (title, done) {
  this.request('http://www.omdbapi.com/?t=' + title, (data) => {
    done(JSON.parse(data.toString('utf-8')));
  });
};

module.exports = OmdbAPI;
