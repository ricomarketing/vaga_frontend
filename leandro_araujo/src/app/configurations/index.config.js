(function() {
  'use strict';

  angular
    .module('rico')
    .config(config);

  /** @ngInject */
  function config($logProvider, $sceDelegateProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    //$httpProvider.defaults.useXDomain = true;
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'https://private-anon-2dc5af8bab-ricocomvc.apiary-mock.com/**'
    ]);
  }

})();
