var ricoApp = angular.module('rico');

ricoApp.filter("mult100", function() {
	return function(input) {
		var result = input * 100;
		return parseFloat(result).toFixed(2);
	};
});