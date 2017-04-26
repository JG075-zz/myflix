var expect = require('chai').expect,
    sinon = require('sinon'),
    proxyquire = require('proxyquire'),
    importer = require('../../app/utils/importer');

describe('Importer', function() {

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
    var myJSON = JSON.stringify({ "title": "Forest Gump"});
    expect(importer.bind(undefined, myJSON)).to.throw(Error, 'Empty or not a JSON array');
  });

  it('should not throw an error if the file given is a JSON array', function() {
    var myJSON = JSON.stringify([{ "title": "Forest Gump"}]);
    expect(importer.bind(undefined, myJSON)).to.not.throw(Error, "Empty or not a JSON array");
  });

});
