(function() {
  'use strict';

  angular
    .module('rico')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(TreasuriesService, IndexesService, $q) {
    var vm = this;
    vm.mostraView = false;
    vm.mostraTabela = false;
    vm.mostraGrafico = false;
    vm.preencherValor = false;
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
    vm.graficoConfig = {
      type: 'BarChart',
      options: {
        title: 'Comparação das rentabilidades dos tesouros',
        colors: ['#ef8a32'],
        backgroundColor: 'none',
        fontName: 'Open Sans',
        height: '100%',
        width: '100%',
        tooltip: { trigger: 'none' }
      }
    }

    $q.all([IndexesService.get(), TreasuriesService.get()]).then(function success(response) {
      vm.index      = response[0].data;
      vm.treasuries = response[1].data;

      vm.valorMinimo = retornaValorMinimo(vm.treasuries);

      vm.mostraView = !vm.mostraView;
    })

    vm.investir = function(valorAinvestir, tempoAinvestir) {
      vm.mostraTabela = false;

      if( vm.valorInvestido >= vm.valorMinimo ) {
        vm.listaTesouros = realizarInvestimento(valorAinvestir, tempoAinvestir);
        vm.listaCincoMelhores = cincoMelhoresParaInvestir(vm.listaTesouros);
        vm.graficoConfig.data = criarGrafico(vm.listaCincoMelhores);

        vm.listaValorAinvestir = valorAinvestir;
        vm.listaTempoAinvestir = tempoAinvestir;

        vm.preencherValor = false;
        vm.mostraTabela = true;
        vm.mostraGrafico = true;
      } else {
        vm.preencherValor = true;
      }
    }

    function realizarInvestimento(valorAinvestir, tempoAinvestir) {
      vm.listaTesouros = [];

      if (vm.treasuries.length > 0 && Object.keys(vm.index).length > 0) {
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

          tesouro.valorResgate  = calcularValorResgate(valorAinvestir, taxaInvestimento, tempoAinvestir / 365);
          tesouro.rentabilidade = calcularRentabilidade(valorAinvestir, tesouro.valorResgate);
        } );

        return vm.treasuries;
      }
    }

    function retornaValorMinimo(tesouros) {
      var valores = [];

      tesouros.map(function(tesouro) {
        valores.push(tesouro.minimumValue);
      });

      return valores.reduce(function(previous, current) {
        return (previous < current) ? previous : current;
      });
    }

    function cincoMelhoresParaInvestir(tesouros) {
      var cincoMelhores = tesouros.slice(0)

      cincoMelhores.sort(function(previous, current) {
        return previous.rentabilidade < current.rentabilidade;
      });

      return cincoMelhores.slice(0, 5);
    }

    function criarGrafico(cincoMelhores) {
      var valores = cincoMelhores.map(function(tesouro, index) {
        return {
          c: [
            {v: '#' + (index + 1) },
            {v: tesouro.rentabilidade }
          ]
        }
      });

      return {
        "cols": [
          {id: "tesouro", label: "Tesouros", type: "string"},
          {id: "rentabilidade", label: "Rentabilidade", type: "number"}
        ],
        "rows": valores
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
