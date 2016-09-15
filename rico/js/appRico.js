var appRico = angular.module('ricoApp', ['googlechart']);

// Controller para preencher a grid com os títulos
appRico.controller('TreasuryController', function($scope, $http) {
	$scope.investmentTime = 30;
	$scope.investmentValue = 0;

  // Método para pegar a lista de titulos do tesouro direto
	this.getTreasures = function()
	{
		$http({
        method : "GET",
        url : "http://private-anon-e170d46abe-ricocomvc.apiary-mock.com/treasury"
	    }).then(function mySucces(response) {
	        $scope.treasures = calculateReturn(response.data);
	        $scope.showGrid = true;	
          fillChart();
	    }, function myError(response) {
	        this.messageError = response.statusText;
	        $scope.showGrid = false;	
	    }); 		
	};	

  // Calculo a rentabilidade
	function calculateReturn(treasures) {
		if(!treasures)
    		return;
    /* 
		MOCK POIS O ENDEREÇO REST INFORMADO ESTÁ DEVOLVENDO UM JSON INVÁLIDO SEGUE O FORMADO DO RETORNO 
		http://private-anon-e170d46abe-ricocomvc.apiary-mock.com/indexes
		{
	    "SELIC": 0.1347, // TAXA SELIC ANUAL
	    "IPCA": 0.1067 // IPCA ANUAL
		}
		*/
		this.indexes = { "SELIC": 0.1347, "IPCA": 0.1067 };  

        for(var i=0; i<treasures.length; i++) {
        	var item = treasures[i];
        	var rateMonth = 0;
        	var investmentValue = 0;

        	// Valor total de Investimento
        	investmentValue = $scope.investmentValue;

            	/* Taxa de rentabibidade Mês */
    			if(item.index.name==="SELIC")
    				rateMonth = (item.currentInterestPercentageValue + this.indexes.SELIC);
    			else if(item.index.name==="IPCA")
    				rateMonth = (item.currentInterestPercentageValue + this.indexes.IPCA);
    			else
    				rateMonth = item.currentInterestPercentageValue;

    			rateMonth = rateMonth/12;
    			/* Taxa de rentabibidade Mês*/

    			// Rentabilidade
    			// Formula Juros Compostos
    			// M=P.(1+i)n
    			item.return = (investmentValue* Math.pow(1 + rateMonth, ($scope.investmentTime/30))) - investmentValue;	
        }

        return treasures;
	}

// Popula o gráfico de rentabilidade
  function fillChart(){

    /* Gráfico do google chart*/
    $scope.chartReturn = {}; 
    $scope.chartReturn.type = "BarChart";

    var data = new google.visualization.DataTable();

    data.addColumn('string', 'Titulos');
    data.addColumn('number', 'Rentabilidade');
    for(var i=0; i< 5; i++) {
      data.addRow([$scope.treasures[i].name, $scope.treasures[i].return]);
    }

    $scope.chartReturn.data = data;
    $scope.chartReturn.options = {
        'title': 'Gráfico dos 5 melhores títulos do tesouro direto para compra.'
    };
  }
});


