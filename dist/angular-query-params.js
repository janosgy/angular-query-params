/**
 * angular-query-params - 
 * @version v1.0.1
 * @link https://github.com/ins87/angular-query-params
 * @license MIT
 */
(function () {

  'use strict';

  angular.module('angularQueryParams', [])
    .service('queryParams', QueryParams);

  QueryParams.$inject = ['$location'];
  function QueryParams($location) {
    var changeAction,
      handleArray;

    this.set = function set(key, value) {
      if (!key) {
        throw new TypeError('Missing argument: key');
      }

      if (angular.isArray(value) && value.length === 1) {
        value = value[0];
      }
      $location.search(key, value);
    };

    this.get = function get(key) {
      var params = $location.search();
      return params[key];
    };

    this.has = function has(key, value) {
      var currentValue = this.get(key);

      if (!value) {
        return !!currentValue;
      }

      return angular.isArray(currentValue) ? currentValue.indexOf(value) !== -1 : currentValue === value;
    };

    this.push = function push(key, value) {
      var handledAsArray = handleArray('push', key, value);
      if (handledAsArray) {
        return;
      }
      if (this.has(key, value)) {
        return;
      }
      changeAction('push', key, value, function generateValues(values) {
        values.push(value);
        return values;
      });
    };

    this.remove = function remove(key, value) {
      var handledAsArray = handleArray('remove', key, value);
      if (handledAsArray) {
        return;
      }
      if (!value) {
        this.set(key);
        return;
      }
      changeAction('remove', key, value, function generateValues(values) {
        return values.filter(function (paramValue) {
          return paramValue !== value;
        });
      });
    };

    handleArray = (function (actionName, key, value) {
      if (!angular.isArray(value)) {
        return false;
      }

      angular.forEach(value, this[actionName].bind(this, key));
      return true;
    }).bind(this);

    changeAction = (function changeAction(actionName, key, value, generateValues) {
      var values = this.get(key) || [];

      if (!angular.isArray(values)) {
        values = [values];
      }
      values = generateValues(values);

      return values.length ? this.set(key, values) : this.set(key);
    }).bind(this);
  }

})();
