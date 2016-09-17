(function() {
  'use strict';

  angular
    .module('vigilantOcto')
    .factory('treasuryService', treasuryService);

  /** @ngInject */
  function treasuryService($resource, apiConfig) {
    var resource = $resource(apiConfig.treasury);

    var service = {
      getAll: getAll
    }

    return service;

    function getAll() {
      return resource.query().$promise;
    }

  }

})();
