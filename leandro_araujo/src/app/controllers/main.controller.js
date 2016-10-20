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

      criarLista(vm.treasuries);
    });

    vm.realizarInvestimento = realizarInvestimento(vm.valorInvestido, vm.sliderConfigs.minValue);

    function criarLista(tesouros) {
      if( tesouros.length > 0 && Object.keys(vm.index).length > 0 ) {
        tesouros.forEach( function(tesouro) {
          var valorTaxa;
          if(tesouro.index.name == 'IPCA') {
            valorTaxa = vm.index.IPCA;
          } else if(tesouro.index.name == 'SELIC') {
            valorTaxa = vm.index.SELIC;
          } else {
            valorTaxa = 0;
          }

          var taxaInvestimento  = calcularTaxaInvestimento(tesouro.currentInterestPercentageValue, valorTaxa);
          var tempoInvestimento = calcularTempoInvestimento(tesouro.issueDate, tesouro.maturityDate, 'YYYY-MM-DD');

          tesouro.valorResgate  = calcularValorResgate(tesouro.minimumValue, taxaInvestimento, tempoInvestimento / 365);
          tesouro.rentabilidade = calcularRentabilidade(tesouro.minimumValue, tesouro.valorResgate);
        } );

        vm.mostraTabela = true;
      }
    }

    function realizarInvestimento(valorAinvestir, tempoAinvestir) {
      vm.mostraTabela = false;

      if(vm.treasuries.length > 0 && Object.keys(vm.index).length > 0 ) {
        vm.treasuries.forEach( function(tesouro) {
          var valorTaxa;
          if(tesouro.index.name == 'IPCA') {
            valorTaxa = vm.index.IPCA;
          } else if(tesouro.index.name == 'SELIC') {
            valorTaxa = vm.index.SELIC;
          } else {
            valorTaxa = 0;
          }

          var taxaInvestimento  = calcularTaxaInvestimento(tesouro.currentInterestPercentageValue, valorTaxa);

          tesouro.valorResgate  = calcularValorResgate(valorAinvestir, taxaInvestimento, tempoAinvestir);
          tesouro.rentabilidade = calcularRentabilidade(valorAinvestir, tesouro.valorResgate);
        } );

        vm.mostraTabela = true;
      }
    }

    function calcularTempoInvestimento(dataLancamento, dataLimite, formatoData) {
      var mmtLancamento = moment(dataLancamento, formatoData);
      var mmtLimite     = moment(dataLimite, formatoData);

      return momentBusiness.weekDays( mmtLancamento, mmtLimite );
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
