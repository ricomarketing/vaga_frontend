(function() {
  'use strict';

  angular
    .module('rico')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(TreasuriesService, IndexesService, TAXAS, moment) {
    var vm = this;
    vm.index = '';
    vm.treasuries = '';
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
    moment.locale('pt-br');

    // recebe indexes
    IndexesService.get().then(function success(response) {
      vm.index = response.data;
    })

    // recebe tesouros
    TreasuriesService.get().then(function success(response) {
      vm.treasuries = response.data;
    })



    // retorna a taxa paga em cima do valor investido
    function calcularTaxaDoInvestimento(valorInvestido, taxaCorretora) {
      return ( valorInvestido * taxaCorretora );
    }

    // retorna o valor real investido sem as taxas
    function calcularValorRealInvestido(valorInvestido, taxaInvestimento) {
      return ( valorInvestido - taxaInvestimento );
    }

    // retorna o valor de resgate no final do tempo investido
    function calcularValorNoRegaste(valorRealInvestido, taxaSelic, tempoInvestimento) {
      return ( valorRealInvestido * Math.pow((1 + taxaSelic ), (tempoInvestimento / 252)) );
    }

    // retorna rentabilidade no periodo de investimento
    function calcularRentabilidade(valorResgate, valorInvestido, tempoInvestimento) {
      return ( Math.pow((valorResgate / valorInvestido), (252 / tempoInvestimento)) - 1 );
    }
  }
})();
