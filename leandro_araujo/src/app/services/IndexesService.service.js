(function() {
  'use strict';

  angular
    .module('rico')
    .service('IndexesService', IndexesService);

  IndexesService.$inject = ['$http', 'API'];

  /** @ngInject */
  function IndexesService($http, API) {
    var vm = this;
    var request = $http({
      method: API.INDEXES.METHOD,
      url: API.INDEXES.URL
    });

    vm.get = function() {
      return request;
    }
  }
})();
