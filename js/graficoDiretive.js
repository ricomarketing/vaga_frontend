var ricoApp = angular.module('rico');

ricoApp.directive('hcChart', function () {
    return {
            restrict: 'E',
            template: '<div></div>',
            scope: {
            	options: '='
           	},
            link: function (scope, element) {
                Highcharts.chart(element[0], scope.options);
            }
    };
})
