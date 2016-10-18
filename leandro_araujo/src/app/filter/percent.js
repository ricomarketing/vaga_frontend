(function() {
  'use strict';

  angular
    .module('rico')
    .filter('percent', percent);

  /** @ngInject */
  function percent() {
    return function(input, nominal) {
      if( input ) {
        if( nominal ) {
          input = (input * 100);
        }

        input = input.toFixed(2);


        return input.replace('.', ',') + '%';
      }
    }
  }
})();
