var expect = require('chai').expect,
    sinon = require('sinon'),
    mongoSetup = require('../mongoSetup'),
    movieModel = require('../../app/models/movie'),
    apiController = require('../../app/controllers/api'),
    testHelpers = require('../testHelpers');

describe('API Controller', function() {
  var req, res;

  beforeEach(function(){
    req = sinon.spy();
    res = { send: sinon.spy() };
  });

  describe('#index()', function() {
    it('should call send with \'ok\'', function() {
      apiController.index(req, res);
      expect(res.send.calledWith('ok')).to.be.true;
    });
  });

  describe('#movies()', function() {

    it('should call send with an array of movie objects', function() {
      sinon.stub(movieModel, 'find').returns({ sort: function() {
        return {
          limit: function() {
            return {
              exec: function (cb) { cb(null, testHelpers.generateMoviesArray(30));}
            };
          }
        };
      }});
      apiController.movies(req, res);
      expect(res.send.args[0][0]).to.have.length.above(0);
      movieModel.find.restore();
    });

    it('should send an error response if there is an error', function() {
      sinon.stub(movieModel, 'find').returns({ sort: function() {
        return {
          limit: function() {
            return {
              exec: function (cb) {
                cb(400, { message: "error" }, testHelpers.generateMoviesArray(30));
              }
            };
          }
        };
      }});
      apiController.movies(req, res);
      expect(res.send.calledWith(400)).to.be.true;
      expect(res.send.args[0][1].hasOwnProperty("message")).to.be.true;
      movieModel.find.restore();
    });

  });

});
