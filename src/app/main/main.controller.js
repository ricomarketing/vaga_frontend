(function() {
  'use strict';

  angular
    .module('vigilantOcto')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(treasuryService, indexesService) {
    var vm = this;

    var treasuries = [];
    var indexes = {};
    vm.model = {};

    activate();

    function activate() {
      getTreasuries();
      getIndexes();
    }

    function getTreasuries() {
      treasuryService.getAll().then(function(data) {
        treasuries = data;
      });
    }

    function getIndexes() {
      indexesService.getAll().then(function(data) {
        indexes = data;
      })
    }

  }
})();
