var ricoApp = angular.module('rico');

//criar e inicializar constantes globais na aplicação:
ricoApp.constant("config", {
	baseUrl: "http://localhost:3000"
});

//criar e inicializar variaveis globais na aplicação:
ricoApp.run(function($rootScope) { 
	$rootScope.tempoInvest = 0;
	$rootScope.valorInvest = 0;
	$rootScope.data = [];
});