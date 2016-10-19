(function() {
  'use strict';

  angular
    .module('rico')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(TreasuriesService, IndexesService, TAXAS, moment, momentBusiness, $q) {
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

    $q.all([IndexesService.get(), TreasuriesService.get()]).then(function success(response) {
      vm.index      = response[0].data;
      vm.treasuries = response[1].data;

      criarLista(vm.treasuries, vm.index);
    });

    // recebe indexes
    /*IndexesService.get().then(function success(response) {
      vm.index = response.data;
    })

    // recebe tesouros
    TreasuriesService.get().then(function success(response) {
      vm.treasuries = response.data;
    })*/

    function criarLista(tesouros, index) {
      console.log('quase');

      if( tesouros.length > 0 && Object.keys(vm.index) .length > 0 ) {
        console.log('foi');

        tesouros.forEach( function(tesouro) {
          var dataLancamento    = moment(tesouro.issueDate, 'YYYY-MM-DD');
          var dataLimite        = moment(tesouro.maturityDate, 'YYYY-MM-DD');
          var tempoInvestimento = momentBusiness.weekDays( dataLancamento, dataLimite );

          console.log(tempoInvestimento / 365);

          // nominal a.a
          var taxaInvestimento  = calcularTaxaInvestimento(tesouro.currentInterestPercentageValue, index.SELIC);
          var valorResgate      = calcularValorResgate(tesouro.minimumValue, taxaInvestimento, tempoInvestimento / 365);

          tesouro.rentabilidade = calcularRentabilidade(tesouro.minimumValue, valorResgate);
        } );

        vm.mostraTabela = !vm.mostraTabela;
      }
    }

    function calcularTaxaInvestimento(taxaTesouro, taxaIndexador) {
      return ( taxaTesouro + taxaIndexador );
    }

    function calcularValorResgate(valorInvestido, taxaInvestimento, tempoInvestimento) {
      return ( valorInvestido * Math.pow(( 1 +  taxaInvestimento), tempoInvestimento) );
    }

    function calcularRentabilidade(valorInvestido, valorResgate) {
      return (valorResgate / valorInvestido);
    }
  }
})();
