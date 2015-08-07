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

    this.has = function has(key) {
      return !!this.get(key);
    };
  }

})();
