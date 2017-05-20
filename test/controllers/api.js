var expect = require('chai').expect,
    sinon = require('sinon'),
    proxyquire = require('proxyquire'),
    testHelpers = require('../testHelpers');

describe('API Controller', function() {
  var req, res, apiController, movieStub;

  beforeEach(function(){
    req = { query: {} };
    res = { send: sinon.spy() };
    movieStub = {
      find: sinon.stub().returnsThis(),
      sort: sinon.stub().returnsThis(),
      skip: sinon.stub().returnsThis(),
      limit: sinon.stub().returnsThis(),
      exec: function (cb) { cb(null, testHelpers.generateMoviesArray(30));}
    };
    apiController = proxyquire('../../app/controllers/api', { '../models/movie': movieStub });
  });

  describe('#index()', function() {
    it('should call send with \'ok\'', function() {
      apiController.index(req, res);
      expect(res.send.calledWith('ok')).to.be.true;
    });
  });

  describe('#movies()', function() {

    it('should call send with an array of movie objects', function() {
      apiController.movies(req, res);
      expect(res.send.args[0][0]).to.have.length.above(0);
    });

    it('should send an error response if there is an error', function() {
      movieStub.exec = function (cb) {
        cb(400, { message: "error" }, testHelpers.generateMoviesArray(30));
      };
      apiController.movies(req, res);
      expect(res.send.calledWith(400)).to.be.true;
      expect(res.send.args[0][1].hasOwnProperty("message")).to.be.true;
    });

  });

});
