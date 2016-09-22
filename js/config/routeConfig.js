//usar "node js/banco/dados.js" no prompt do nodeJS, para criar as listas.

angular.module("rico").config( function($routeProvider) {
	$routeProvider
		.when("/tesouro", {
			templateUrl: "view/ofertas.html",
			controller: "listaOfertasCtrl",
			resolve: {
				listaOfertas: function(ofertasAPI) {
					return ofertasAPI.getOfertas();         //lido de serviceAPI
				},
				listaIndices: function(indicesAPI) {
					return indicesAPI.getIndices();         
				}
			}
		})	
		.when("/investimento", {
			templateUrl: "view/investimento.html",
			controller: "formInvestCtrl",
			resolve: {
				listaOfertas: function(ofertasAPI) {
					return ofertasAPI.getOfertas();
				}
			}
		})
		.otherwise({
			redirectTo: "/tesouro" 
		});
});