var expect = require('chai').expect,
    sinon = require('sinon'),
    proxyquire = require('proxyquire');

describe('Importer', function() {
  var myMovies = [{"title":"Forest Gump"},{"title":"Madagascar"},{"title":"Inception"}];
  var myJSON = JSON.stringify(myMovies);

  var importer, movieStub, infoFetcherStub;

  beforeEach(function() {
    infoFetcherStub = {
      fetch: function(title, done) { done({title: title});}
    };
    movieStub = function(opts) {};
    movieStub.count = function(opts, done) {
      done();
    };
    importer = proxyquire('../../app/utils/importer', { '../models/movie': movieStub, '../helpers/infoFetcher': infoFetcherStub });
  });

  it('should not be an empty object', function() {
    expect(importer).to.not.eql({});
  });

  it('should throw an error if the file given is null', function() {
    expect(importer).to.throw(Error, "No file or wrong type given");
  });

  it('show throw an error if the file given is not JSON', function() {
    expect(importer.bind(undefined, "string")).to.throw(Error, "No file or wrong type given");
  });

  it('should throw an error if given JSON but not an array', function() {
    var notArray = JSON.stringify({ "title": "Forest Gump"});
    expect(importer.bind(undefined, notArray)).to.throw(Error, 'Empty or not a JSON array');
  });

  it('should not throw an error if the file given is a JSON array', function() {
    expect(importer.bind(undefined, myJSON)).to.not.throw(Error, "Empty or not a JSON array");
  });

  it('shoud call infoFetch with each title in the array', function() {
    sinon.spy(infoFetcherStub, 'fetch');
    importer(myJSON);
    var args = infoFetcherStub.fetch.args.map(function(element) {
      return element[0]; // removes callback function from arguments
    });
    expect(args == [['Forest Gump'], ['Madagascar'], ['Inception']].toString()).to.be.true;
    infoFetcherStub.fetch.restore();
  });

  it('should create a new movie for each item from infoFetch', function() {
    movieStub = sinon.spy();
    movieStub.count = function(opts, done) { done();};
    runProxquire(); // need to run proxyquire again to use the updated movieStub
    importer(myJSON);
    var movieTitles = [[{ title: 'Forest Gump' }], [{ title: 'Madagascar'}], [{ title: 'Inception'}]];
    // converts each to JSON to compare array of objects
    expect(JSON.stringify(movieStub.args) == JSON.stringify(movieTitles)).to.be.true;
  });

  it('should save the movie to the database', function() {
    movieStub.prototype.save = sinon.spy();
    importer(myJSON);
    expect(movieStub.prototype.save.called).to.be.true;
  });

  it('calls Movie.count() to get the beforeCount', function() {
    movieStub.count = sinon.spy();
    importer(myJSON);
    expect(movieStub.count.called).to.be.true;
  });

  function runProxquire() {
    importer = proxyquire('../../app/utils/importer', { '../models/movie': movieStub, '../helpers/infoFetcher': infoFetcherStub });
  }

});
