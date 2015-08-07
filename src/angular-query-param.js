(function () {

  'use strict';

  angular.module('angularQueryParam', [])
    .service('queryParam', QueryParam);

  function QueryParam($location) {
    this.set = function set(key, value) {
      $location.search(key, value);
    };

    this.get = function get(key) {
      var params = $location.search();
      return params[key];
    };

    this.has = function has(key, value) {
      var currentValue = this.get(key);
      return !!value ?  currentValue === value : !!currentValue;
    };

    this.remove = function remove(key) {
      this.set(key);
    };
  }

})();
