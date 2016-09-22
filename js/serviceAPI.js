var ricoApp = angular.module('rico');

ricoApp.service("ofertasAPI", function($http, config) {

	this.getOfertas = function() {
		return $http.get(config.baseUrl + "/tesouro");
	};

});

ricoApp.service("indicesAPI", function($http, config) {

	this.getIndices = function() {
		return $http.get(config.baseUrl + "/indexes");
	};

});