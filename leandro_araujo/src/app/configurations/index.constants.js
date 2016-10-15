
(function() {
  'use strict';

  angular
    .module('rico')
    .constant('API', {
      'INDEXES': {
        'METHOD': 'GET',
        'URL': 'https://private-anon-2dc5af8bab-ricocomvc.apiary-mock.com/indexes'
      },
      'TREASURY': {
        'METHOD': 'GET',
        'URL': 'https://private-anon-2dc5af8bab-ricocomvc.apiary-mock.com/treasury'
      }
    })
    .constant('TAXAS', {
      'CUSTODIA': 0.003,
      'CORRETORA': 0.001
    })
    .constant('GERAL', {
      'DIAS_ANO': 254
    });

})();
