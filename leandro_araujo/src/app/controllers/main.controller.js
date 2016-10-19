(function() {
  'use strict';

  angular
    .module('rico')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(TreasuriesService, IndexesService, TAXAS) {
    var vm = this;
    vm.mostraTabela = false;
    vm.sliderConfigs = {
      minValue: 30,
      options: {
          floor: 30,
          ceil: 30*12*2,
          step: 30,
          minRange: 30,
          showSelectionBar: true,
          hideLimitLabels: true,
          showTicks: true,
          translate: function(value) {
            return value + ' dias';
          }
      }
    }

    // recebe indexes
    IndexesService.get().then(function success(response) {
      vm.index = response.data;
    })

    // recebe tesouros
    TreasuriesService.get().then(function success(response) {
      vm.treasuries = response.data;

      vm.mostraTabela = true;
    })


    vm.realizarInvestimento = function realizarInvestimento(valorInvestido, tempoInvestimento) {

    }

    // retorna os cinco melhores para investir
    vm.retornaOsCincoMaiores = function retornaOsCincoMaiores(tesouros) {
      // asasa
    }


    // retorna rentabilidade no periodo de investimento
    vm.calcularRentabilidade = function calcularRentabilidade(valorResgate, valorInvestido, tempoInvestimento) {
      // sahudauda
    }
  }
})();
