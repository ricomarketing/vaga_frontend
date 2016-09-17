var ricoApp = angular.module('rico');

ricoApp.controller('listaOfertasCtrl', function($scope, $rootScope, listaOfertas, listaIndices){
	$scope.app = "Produtos de Tesouro Direto";

	$scope.ofertas = listaOfertas.data;        //lido de routeConfig.js
	$scope.indices = listaIndices.data;

	$scope.indices.forEach( function(ind) {        //pega último índice IPCA e SELIC.
		$scope.txIPCA  = ind.IPCA;		//valor não percentual (nominal)
		$scope.txSELIC = ind.SELIC;
	});

	var init = function () {
		calcularJurosMensal($scope.ofertas);

	 	if ($rootScope.tempoInvest != 0) {
			calcularRentabilidade($scope.ofertas);
			$rootScope.data = preencher5Maiores($scope.ofertas);
	 	};
	 };

	var calcularJurosMensal = function(ofertas) {
		ofertas.forEach( function(produto) {
			//Calcular taxa de rendimento anual, somando a taxa do produto com o indexador.
			var txAnual = produto.currentInterestPercentageValue;      //valor não percentual (nominal)

			if (produto.index.name === "IPCA") 
				txAnual = txAnual + $scope.txIPCA;
			else if (produto.index.name === "SELIC") 
				txAnual += txAnual + $scope.txSELIC;

			//Calcular taxa de juros mensal (em %)
			var a = 1 + txAnual ;
			var exp = 1 / 12;
			var jurosMes = ( Math.pow(a, exp) - 1 ) * 100;  

			produto.txJurosMes = jurosMes.toFixed(5);  
		});
	};

	var calcularRentabilidade = function (ofertas) {
		ofertas.forEach( function(produto) {
			var N = $rootScope.tempoInvest;
			var P = $rootScope.valorInvest;						

			if (P >= produto.minimumValue) {

				// M = P . { [1 +  (i/100)] elevado a N}, onde:

				// M = Valor de Resgate (Montante)			
				// P = Valor Investido (Principal) 
				// i = juros mensal (%)			
				// N = número de meses 

				var a = 1 + (produto.txJurosMes / 100);


				var b = Math.pow(a, N);

				var M = (P * b).toFixed(2);

				produto.vlrResgate = M;
				produto.rentabilidade = M - P;

			} else {          //Investiu menos que o valor mínimo de compra.
				produto.vlrResgate = 0;
				produto.rentabilidade = 0;
			};
		});
	};

	var preencher5Maiores = function (ofertas) {
		var compareDescendente = function(a,b) {
    		if (a.rentabilidade === b.rentabilidade) {
        		return 0;
    		} else {
        		return (a.rentabilidade < b.rentabilidade) ? 1 : -1;
    		};
    	};
		ofertas.sort(compareDescendente);   //ordena ofertas de forma descendente

		var arData = new Array();
		arData = [{
				name: ofertas[0].name,
				y: parseFloat(ofertas[0].rentabilidade.toFixed(2))
			}, {
				name: ofertas[1].name,
				y: parseFloat(ofertas[1].rentabilidade.toFixed(2))
			}, {
				name: ofertas[2].name,
				y: parseFloat(ofertas[2].rentabilidade.toFixed(2))
			}, {
				name: ofertas[3].name,
				y: parseFloat(ofertas[3].rentabilidade.toFixed(2))
			}, {
				name: ofertas[4].name,
				y: parseFloat(ofertas[4].rentabilidade.toFixed(2))
			}];
		return arData;
	};
	
	init();
});

//////////////////////////////////////////////////

ricoApp.controller('formInvestCtrl', function($scope, $rootScope, $location){
	var investido = {};
	$rootScope.tempoInvest = 0;
	$rootScope.valorInvest = 0;

	$scope.simular = function (invest) {
		investido = angular.copy(invest);

		if ((investido.tempo % 30) == 0 ) {
			$rootScope.tempoInvest = investido.tempo / 30;
			$rootScope.valorInvest = investido.valor;
			$location.path("/tesouro"); 

		} else {
			alert("Por favor, para o Tempo de Investimento, digite um múltiplo de 30, \npor exemplo: 30, 60, 90, 120, ...")
		};
	};
})

/////////////////////////////////////////////////

ricoApp.controller('hcChartCtrl', function($scope, $rootScope){
	// Abaixo, foi importado do site http://www.highcharts.com/
	// Foi adaptado ao projeto do Rico

	var init = function () {
		var elem = $rootScope.data;  

		$scope.chartOptions = {
		    chart: {
		        type: 'column'
		    },
		    title: {
		        text: 'Gráfico dos 5 melhores Investimentos'
		    },
		    xAxis: {
		        type: 'category'
		    },
		    yAxis: {
		        title: { text: 'Rentabilidade' }
		    },
		    legend: {
		        enabled: false
		    },
		    plotOptions: {
		        series: {
		            borderWidth: 0,
		            dataLabels: {
		                enabled: true,
		                format: 'R$ {point.y:.2f}'
		            }
		        }
		    },
		    tooltip: {
		        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
		        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>R$ {point.y:.2f}</b><br/>'
		    },
		    series: [{
		        name: 'Rentabilidade',
		        colorByPoint: true,
		        data: elem
		    }]
		};		
	};

	init();
});