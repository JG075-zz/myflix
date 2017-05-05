var request = require('requestretry');

/*
 * Interacts with the OMDB API. Arguments:
 *
 *    title        A movie title, should be a string.
 *
 *    year         (optional) The year of the title, should be a string.
 *
 *    done          A callback invoked when the process is completed. When sucessful
 *                  it calls done(null, movie), where movie is a JS object. Otherwise it
 *                  will call done(err, null).
 *
*/
module.exports = {
  get: function(title, year, done) {
    if (typeof year === "function"){
      done = year; // set second argument to callback
      year = null;
    }

    var omdbRequest = 'http://www.omdbapi.com/?t=' + title;
    if (year) omdbRequest += "&y=" + year;

    request({
      url: omdbRequest,
      maxAttempts: 5,
      retryDelay: 5000,
      retryStrategy: request.RetryStrategies.HTTPOrNetworkError
    }, function (err, response, body) {
        if (err) return done(err, null);

        var parsedBody = (JSON.parse(body));

        if (parsedBody.Response == 'False') return done(parsedBody, null);
        return done(null, parsedBody);
    });
  }
};
