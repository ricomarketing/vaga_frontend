(function() {
  'use strict';

  angular
    .module('rico')
    .config(config);

  /** @ngInject */
  function config($logProvider, $sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'https://private-anon-2dc5af8bab-ricocomvc.apiary-mock.com/**'
    ]);
  }

})();
