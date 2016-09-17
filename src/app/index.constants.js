(function() {
  'use strict';
  var urls = {
    treasury: 'http://private-anon-caf9b9b7c5-ricocomvc.apiary-mock.com/treasury',
    indexes: 'http://private-89403-herberthenrique.apiary-mock.com/indexes'
  }

  angular
    .module('vigilantOcto')
    .constant('apiConfig', urls)

})();
