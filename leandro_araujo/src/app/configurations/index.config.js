(function() {
  'use strict';

  angular
    .module('leandroAraujo')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
  }

})();
