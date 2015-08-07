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

  describe('with single item', function () {
    var key,
      value,
      searchMock;

    beforeEach(function () {
      key = 'testParam';
      value = 'testValue';
      searchMock = {};
      searchMock[key] = value;
    });

    it('should set a parameter to the url', function () {
      spyOn($location, 'search');

      queryParam.set(key, value);
      expect($location.search).toHaveBeenCalledWith(key, value);
    });

    it('should get a parameter from the url', function () {
      spyOn($location, 'search').and.returnValue(searchMock);

      expect(queryParam.get(key)).toEqual(value);
      expect(queryParam.get(value)).toBeUndefined();
    });

    it('should tell if a key is set', function () {
      spyOn($location, 'search').and.returnValue(searchMock);

      expect(queryParam.has(key)).toBe(true);
      expect(queryParam.has(value)).toBe(false);
    });

    it('should tell if a key is set with a value', function () {
      spyOn($location, 'search').and.returnValue(searchMock);

      expect(queryParam.has(key, value)).toBe(true);
      expect(queryParam.has(key, key)).toBe(false);
    });
  });


});
