(function() {
  'use strict';

  angular
    .module('leandroAraujo')
    .service('TesouroIndireto', TesouroIndireto);

  TesouroIndireto.$inject = ['$http', '$q', 'API'];

  /** @ngInject */
  function TesouroIndireto($http, $q, API) {
    var vm = this;
    var defer = $q.defer();

    vm.get = function() {
      $http({
        method: API.treasury.method,
        url: API.treasury.url
      }).then(function success(response) {
        defer.resolve(response);
      }, function error(response) {
        defer.resolve(response);
      });

      return defer.promise;
    }
  }
})();
