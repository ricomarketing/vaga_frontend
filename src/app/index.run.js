(function() {
  'use strict';

  angular
    .module('vigilantOcto')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {
    $log.debug('runBlock end');
  }

})();
