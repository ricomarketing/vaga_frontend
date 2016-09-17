(function() {
  'use strict';

  angular
    .module('vigilantOcto')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(treasuryService, indexesService, toastr) {
    var vm = this;

    vm.treasuries = [];
    vm.indexes = {};
    vm.calcDone = false;
    vm.model = {};

    vm.calculate = calculate;

    activate();

    function activate() {
      getTreasuries();
      getIndexes();
    }

    function getTreasuries() {
      treasuryService.getAll().then(function(data) {
        vm.treasuries = data;
      });
    }

    function getIndexes() {
      indexesService.getAll().then(function(data) {
        vm.indexes = data;
        vm.indexes.prefixado = 0;
      })
    }

    function calculate() {

      var days = parseFloat(vm.model.days);
      var investmentValue = parseFloat(vm.model.value);
      if(!vm.model.value || investmentValue <= 0) {
        toastr.warning('Preencha o valor de investimento');
        return;
      }

      if(!vm.model.days || days <= 0) {
        toastr.warning('Preencha o tempo de investimento');
        return;
      }

      vm.investments = vm.treasuries.filter(function(t) {
        return investmentValue >= t.minimumValue;
      })
      console.log('investments', vm.investments);

      vm.investments = vm.investments.map(function(t) {
        var investmentTax = t.currentInterestRate + vm.indexes[t.index.name];
        var dayTax = investmentTax / 365;
        var totalProfit = ((vm.model.days * dayTax) / 100) * vm.model.value;
        t.profit = totalProfit.toFixed(2);
        t.numberProfit = totalProfit;
        t.total = (totalProfit + investmentValue).toFixed(2);
        return t;
      });

      vm.investments.sort(function(a, b){
        return a.numberProfit - b.numberProfit;
      }).reverse();

      vm.calcDone = true;
    }

  }
})();
