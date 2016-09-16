(function() {
  'use strict';

  angular
    .module('vigilantOcto')
    .factory('indexesService', indexesService);

  /** @ngInject */
  function indexesService($resource, apiConfig) {
    var resource = $resource(apiConfig.indexes, {}, {
      query: { method: 'GET', params: {}, isArray: false }
    });

    var service = {
      getAll: getAll
    }

    return service;

    function getAll() {
      return resource.query().$promise;
    }

  }

})();
