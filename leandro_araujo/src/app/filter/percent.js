(function() {
  'use strict';

  angular
    .module('rico')
    .filter('percent', percent);

  /** @ngInject */
  function percent() {
    return function(input, nominal) {
      console.log(input);

      if( input ) {
        var input = input;

        if( nominal ) {
          input = (input * 100).toFixed(2);
        }

        input = input.toString();

        return input.replace('.', ',') + '%';
      }
    }
  }
})();
