(function() {
  'use strict';

  angular
    .module('rico')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(TreasuriesService, IndexesService, TAXAS, moment, momentBusiness, $q) {
    var vm = this;
    vm.mostraView = false;
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
      vm.mostraView = !vm.mostraView;
      vm.index      = response[0].data;
      vm.treasuries = response[1].data;

      criarLista(vm.treasuries, vm.index);
    });

    function criarLista(tesouros, index) {
      if( tesouros.length > 0 && Object.keys(vm.index) .length > 0 ) {
        tesouros.forEach( function(tesouro) {
          var dataLancamento    = moment(tesouro.issueDate, 'YYYY-MM-DD');
          var dataLimite        = moment(tesouro.maturityDate, 'YYYY-MM-DD');
          var tempoInvestimento = momentBusiness.weekDays( dataLancamento, dataLimite );
          var valorTaxa        = 0;

          // nominal a.a
          if(tesouro.index.name == 'IPCA') {
            valorTaxa = index.IPCA;
          if(tesouro.index.name == 'SELIC') {
            valorTaxa = index.SELIC;
          } else {
            valorTaxa = 0;
          }

          var taxaInvestimento  = calcularTaxaInvestimento(tesouro.currentInterestPercentageValue, valorTaxa);
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
