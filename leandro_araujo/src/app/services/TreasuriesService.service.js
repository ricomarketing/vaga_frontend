(function() {
  'use strict';

  angular
    .module('rico')
    .service('TreasuriesService', TreasuriesService);

  /** @ngInject */
  function TreasuriesService($http, API) {
    var vm = this;
    var request = $http({
      method: API.TREASURY.METHOD,
      url: API.TREASURY.URL
    });

    vm.get = function() {
      return request;
    }
  }
})();
