'use strict';

describe('angularQueryParams', function () {
  var queryParams,
    $location;

  beforeEach(module('angularQueryParams'));

  beforeEach(inject(function (_$location_, _queryParams_) {
    $location = _$location_;
    queryParams = _queryParams_;
  }));

  it('should be defined', function () {
    expect(queryParams).toBeDefined();
  });

  it('should throw an error if no key given to set', function () {
    expect(queryParams.set).toThrowError(TypeError);
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

      queryParams.set(key, value);
      expect($location.search).toHaveBeenCalledWith(key, value);
    });

    it('should get a parameter from the url', function () {
      spyOn($location, 'search').and.returnValue(searchMock);

      expect(queryParams.get(key)).toEqual(value);
      expect(queryParams.get(value)).toBeUndefined();
    });

    it('should tell if a key is set', function () {
      spyOn($location, 'search').and.returnValue(searchMock);

      expect(queryParams.has(key)).toBe(true);
      expect(queryParams.has(value)).toBe(false);
    });

    it('should tell if a key is set with a value', function () {
      spyOn($location, 'search').and.returnValue(searchMock);

      expect(queryParams.has(key, value)).toBe(true);
      expect(queryParams.has(key, key)).toBe(false);
    });

    it('should remove a parameter from the url', function () {
      spyOn($location, 'search').and.returnValue({});

      queryParams.remove(key);
      expect($location.search).toHaveBeenCalledWith(key, undefined);
    });

    it('should remove a parameter from the url with a specified value', function () {
      spyOn($location, 'search').and.returnValue(searchMock);

      queryParams.remove(key, value);
      expect($location.search).toHaveBeenCalledWith(key, undefined);
    });
  });

  describe('with an array', function () {
    var key,
      value;

    beforeEach(function () {
      key = 'testParam';
      value = 'testValue';
    });

    it('should push parameters to the url', function () {
      spyOn($location, 'search').and.callThrough();

      queryParams.set(key, value + 1);
      queryParams.push(key, value + 2);
      expect($location.search).toHaveBeenCalledWith(key, [value + 1, value + 2]);

      queryParams.push(key, value + 3);
      expect($location.search).toHaveBeenCalledWith(key, [value + 1, value + 2, value + 3]);
    });

    it('should push single parameter to the url', function () {
      spyOn($location, 'search').and.callThrough();

      queryParams.push(key, value + 1);
      expect($location.search).toHaveBeenCalledWith(key, value + 1);
    });

    it('should push array as parameter values to the url', function () {
      spyOn($location, 'search').and.callThrough();

      queryParams.push(key, [value + 1, value + 2, value + 3]);
      expect($location.search).toHaveBeenCalledWith(key, [value + 1, value + 2, value + 3]);
    });

    it('should not push parameter to the url if that parameter is already exists', function () {
      spyOn($location, 'search').and.callThrough();

      queryParams.push(key, value);
      expect($location.search).toHaveBeenCalledWith(key, value);

      queryParams.push(key, value);
      expect($location.search).toHaveBeenCalledWith(key, value);
    });

    it('should remove a parameter from array parameters on a specified key', function () {
      queryParams.push(key, value + 1);
      queryParams.push(key, value + 2);

      queryParams.remove(key, value + 1);
      expect(queryParams.get(key)).toEqual(value + 2);
    });

    it('should remove multiple parameters from array parameters on a specified key', function () {
      queryParams.push(key, value + 1);
      queryParams.push(key, value + 2);
      queryParams.push(key, value + 3);

      queryParams.remove(key, [value + 2, value + 3]);
      expect(queryParams.get(key)).toEqual(value + 1);
    });
  });


});
