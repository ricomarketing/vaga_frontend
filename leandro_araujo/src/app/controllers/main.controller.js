(function() {
  'use strict';

  angular
    .module('leandroAraujo')
    .controller('MainController', MainController);

  MainController.$inject = ['TesouroIndireto']

  /** @ngInject */
  function MainController(TesouroIndireto) {
    var vm = this;
    vm.lista = '';

    TesouroIndireto.get().then(function success(response) {
      vm.lista = response.data;
    })
  }
})();
