(function () {

  'use strict';

  angular.module('angularQueryParam', [])
    .service('queryParam', QueryParam);

  function QueryParam($location) {
    this.set = function set(key, value) {
      $location.search(key, value);
    };
  }

})();
