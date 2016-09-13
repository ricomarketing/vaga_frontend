(function() {
  'use strict';

  angular
    .module('vigilantOcto')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController() {
    var vm = this;
    vm.model = {};

    activate();

    function activate() {
    }

  }
})();
