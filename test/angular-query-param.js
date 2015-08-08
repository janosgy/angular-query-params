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

  it('should throw an error if no key given to set', function () {
    expect(queryParam.set).toThrowError(TypeError);
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

    it('should remove a parameter from the url', function () {
      spyOn($location, 'search');

      queryParam.remove(key);
      expect($location.search).toHaveBeenCalledWith(key, undefined);
    });


    describe('with an array', function() {
      var key,
        value;

      beforeEach(function () {
        key = 'testParam';
        value = 'testValue';
      });

      it('should push parameters to the url', function () {
        spyOn($location, 'search').and.callThrough();

        queryParam.set(key, value + 1);
        queryParam.push(key, value + 2);
        expect($location.search).toHaveBeenCalledWith(key, [value + 1, value + 2]);

        queryParam.push(key, value + 3);
        expect($location.search).toHaveBeenCalledWith(key, [value + 1, value + 2,  value + 3]);
      });

      it('should push single parameter to the url', function () {
        spyOn($location, 'search').and.callThrough();

        queryParam.push(key, value + 1);
        expect($location.search).toHaveBeenCalledWith(key, value + 1);
      });

      it('should push array as parameter values to the url', function () {
        spyOn($location, 'search').and.callThrough();

        queryParam.push(key, [value + 1, value + 2, value + 3]);
        expect($location.search).toHaveBeenCalledWith(key, [value + 1, value + 2,  value + 3]);
      });

      it('should not push parameter to the url if that parameter is already exists', function () {
        spyOn($location, 'search').and.callThrough();

        queryParam.push(key, value);
        expect($location.search).toHaveBeenCalledWith(key, value);

        queryParam.push(key, value);
        expect($location.search).toHaveBeenCalledWith(key, value);
      });

      it('should remove a parameter from array parameters on a specified key', function() {
        queryParam.push(key, value + 1);
        queryParam.push(key, value + 2);

        queryParam.remove(key, value + 1);
        expect(queryParam.get(key)).toEqual(value + 2);
      });

      it('should remove multiple parameters from array parameters on a specified key', function() {
        queryParam.push(key, value + 1);
        queryParam.push(key, value + 2);
        queryParam.push(key, value + 3);

        queryParam.remove(key, [value + 2, value + 3]);
        expect(queryParam.get(key)).toEqual(value + 1);
      });
    });
  });


});
