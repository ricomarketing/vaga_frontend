// Endpoints
var endpoints = {
  indexes: 'https://private-anon-ace1a83ce3-ricocomvc.apiary-mock.com/indexes',
  treasury: 'http://private-anon-ace1a83ce3-ricocomvc.apiary-mock.com/treasury'
};

// App module
var app = angular.module('app', ['rzModule']);

// Controller Investimentos
app.controller('investimentos', function($scope, $http) {

  // atributos
  $scope.slider = { value: 360, options: { floor: 30, ceil: 730, step: 30 } };
  $scope.valor = 100;
  $scope.indexes = {};
  $scope.treasury = [];

  // atualiza os valores de rentabilidade de todos produtos
  $scope.atualizarRentabilidade = function() {
    var treasury = this.treasury;
    // recalcula rentabilidades
    for(var i in treasury) {
      treasury[i].rentabilidade = this.calcularRentabilidade(parseInt(this.slider.value), parseFloat(this.valor), this.indexes, treasury[i]);
    }
    // ordena lista por rentabilidade
    treasury.sort(function(a, b) {
      return parseFloat(a.rentabilidade) < parseFloat(b.rentabilidade);
    });
    this.treasury = treasury;
    // exibe tabela
    document.getElementById('produtos').style.display = 'table';
    // desenha o grafico de comparação
    this.desenhaGrafico();
  };

  // calcula o valor de rentabilidade de um produto
  $scope.calcularRentabilidade = function(tempo, valor, indexes, treasury) {
    // valida se atende o investimento mínimo do produto
    if(valor < treasury.minimumValue) {
      return 0;
    }
    // calcula o rendimento anual (taxa rendimento + taxa indexador)
    var rendimentoAnual = treasury.currentInterestRate;
    if(indexes[treasury.index.name] !== undefined) {
      rendimentoAnual += indexes[treasury.index.name];
    }
    // tempo de investimento (em anos)
    var tempoEmAnos = tempo / 365;
    // valor final do investimento (juros compostos)
    var valorFinal = valor * Math.pow((1 + (rendimentoAnual / 100)), tempoEmAnos);
    // calcula a rentabilidade
    return (((valorFinal / valor) - 1) * 100).toFixed(2);
  };

  $scope.desenhaGrafico = function() {
    var BAR_COUNT = 5; // numero de barras
    var BAR_WIDTH = 100; // largura das barras
    var ZOOM_RATIO = 10 // multiplicador do valor a ser plotado (zoom)
    // obtem contexto do canvas
    var canvas = document.getElementById('grafico');
    var context = canvas.getContext('2d');
    // limpa contexto atual
    context.clearRect(0, 0, canvas.width, canvas.height);
    // define altura e largura do canvas
    canvas.height = this.treasury[0].rentabilidade * ZOOM_RATIO + BAR_WIDTH * 2;
    canvas.width = BAR_COUNT * BAR_WIDTH * 2;
    // pinta cada barra do grafico com os valores de 'treasury'
    for(i = 0; i < BAR_COUNT; i++) {
      // barra
      var width = BAR_WIDTH;
      var height = this.treasury[i].rentabilidade * ZOOM_RATIO;
      var x = i * width * 2 + width / 2;
      var y = canvas.height - height - width;
      context.fillStyle = '#0db9f0';
      context.fillRect(x, y, width, height);
      // valor da rentabilidade
      context.font = '16px Verdana';
      context.textAlign = 'center';
      context.fillStyle = '#666';
      context.fillText(this.treasury[i].rentabilidade, x + width / 2, y - 8); // text, x, y
      // nome do produto
      context.font = '10px Verdana';
      context.fillText(this.treasury[i].name, x + width / 2, canvas.height - width / 2, width * 2); // text, x, y, maxWidth
    }
  };

  // formata formato de moeda
  $scope.formataDinheiro = function(valor) {
    return 'R$ ' + valor.toFixed(2).replace('.', ',');
  };

  // formata data de formato ISO para formato nacional
  $scope.formataData = function(valor) {
    var data = new Date(valor);
    var dia = data.getUTCDate();
    if(dia < 10) dia = '0' + dia;
    var mes = data.getUTCMonth()+1;
    if(mes < 10) mes = '0' + mes;
    var ano = data.getUTCFullYear();
    return dia + '/' + mes + '/' + ano;
  };

  // obtem valores dos indices
  $http.get(endpoints.indexes).then(function(response) {
    $scope.indexes = response.data;
  });

  // obtem valores dos produtos
  $http.get(endpoints.treasury).then(function(response) {
    $scope.treasury = response.data;
  });
});
