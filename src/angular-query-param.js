(function () {

  'use strict';

  angular.module('angularQueryParam', [])
    .service('queryParam', QueryParam);

  function QueryParam($location) {
    this.set = function set(key, value) {
      if(!key) {
        throw new TypeError('Missing argument: key');
      }

      if(angular.isArray(value) && value.length === 1) {
        value = value[0];
      }
      $location.search(key, value);
    };

    this.push = function push(key, value) {
      var values;

      if(angular.isArray(value)) {
        angular.forEach(value, this.push.bind(this, key));
        return;
      }

      if(this.has(key, value)) {
        return;
      }

      values = this.get(key) || [];
      if(!angular.isArray(values)) {
        values = [values];
      }
      values.push(value);

      this.set(key, values);
    };

    this.get = function get(key) {
      var params = $location.search();
      return params[key];
    };

    this.has = function has(key, value) {
      var currentValue = this.get(key);

      if(!value) {
        return !!currentValue;
      }

      return angular.isArray(currentValue) ? currentValue.indexOf(value) !== -1 : currentValue === value;
    };

    this.remove = function remove(key, value) {
      var values;

      if(angular.isArray(value)) {
        angular.forEach(value, this.remove.bind(this, key));
        return;
      }

      if(!value) {
        this.set(key);
        return;
      }

      values = this.get(key) || [];
      values = values.filter(function(paramValue) {
        return paramValue !== value;
      });

      this.set(key, values);
    };
  }

})();
