(function() {
  'use strict';

  angular
    .module('rico')
    .service('TreasuriesService', TreasuriesService);

  TreasuriesService.$inject = ['$http', 'API'];

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
