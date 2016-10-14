
(function() {
  'use strict';

  angular
    .module('leandroAraujo')
    .constant('API', {
      indexes: {
        method: 'GET',
        url: 'https://private-anon-2dc5af8bab-ricocomvc.apiary-mock.com/indexes'
      },
      treasury: {
        method: 'GET',
        url: 'https://private-anon-2dc5af8bab-ricocomvc.apiary-mock.com/treasury'
      }
    });

})();
