var expect = require('chai').expect,
    sinon = require('sinon'),
    apiController = require('../../app/controllers/api');

describe('API Controller', function() {
  var req, res;

  beforeEach(function(){
    req = sinon.spy();
    res = { send: sinon.spy() };
  });

  describe('#index()', function() {
    it('should call send with \'ok\'', function(){
      apiController.index(req, res);
      expect(res.send.calledWith('ok')).to.be.true;
    });
  });

  describe('#movies()', function() {
    it('should call send with an array of movie objects', function(){
      apiController.index(req, res);
      expect(res.send.args[0].length).have.length.above(1);
      expect(res.send.args[0][0]).to.be.an('object');
    });

    it('should have no more than 20 results', function(){

    });
  });


});
