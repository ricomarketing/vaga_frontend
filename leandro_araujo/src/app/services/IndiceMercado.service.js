(function() {
  'use strict';

  angular
    .module('leandroAraujo')
    .service('IndiceMercado', IndiceMercado);

  IndiceMercado.$inject = ['$http', '$q', 'API'];

  /** @ngInject */
  function IndiceMercado($http, $q, API) {
    var vm = this;
    var defer = $q.defer();

    vm.get = function() {
      $http({
        method: API.indexes.method,
        url: API.indexes.url
      }).then(function success(response) {
        defer.resolve(response);
      }, function error(response) {
        defer.resolve(response);
      });

      return defer.promise;
    }
  }
})();
