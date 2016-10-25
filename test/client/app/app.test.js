describe('app', function () {
  'use strict';
  // load our angular moule befor each test
  beforeEach(module('app'));

  describe('app tests', function () {
    it('should recognize our angular module', function () {
      expect(angular.module('app')).to.exist;
    });
  });
});
