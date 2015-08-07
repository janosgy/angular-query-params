'use strict';

describe('angularQueryParam', function () {
  var queryParam,
    $location;

  beforeEach(module('angularQueryParam'));

  beforeEach(inject(function (_$location_, _queryParam_) {
    $location = _$location_;
    queryParam = _queryParam_;
  }));

  it('should be defined', function () {
    expect(queryParam).toBeDefined();
  });

  it('should set a simple parameter to the url', function () {
    var key = 'testParam',
      value = 'testValue';
    spyOn($location, 'search');

    queryParam.set(key, value);
    expect($location.search).toHaveBeenCalledWith(key, value);
  });

});