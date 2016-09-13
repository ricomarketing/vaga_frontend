(function() {
  'use strict';

  angular
    .module('vigilantOcto')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
  }

})();
