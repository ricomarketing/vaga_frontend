/**
 *
 * Módulo com funções a serem aplicadas no angular
 *
 */

_rico.angular = {

	// módulo interno do angular
	module: window.angular.module(_rico.config.angular.application, [])
};

// serviço para os itens da tabela
_rico.angular.module.service(_rico.config.angular.service, function () {

    this._list;
    this._invTime;
    this._investment;

    // funções de acesso para atributos

    this.fnGetList = function() {
    	return this._list;
    };

    this.fnSetList = function(value) {
    	this._list = value;
    };

    this.fnGetInvTime = function() {
    	return this._invTime;
    };

    this.fnSetInvTime = function(value) {
    	this._invTime = value;
    };

    this.fnGetInvestment = function() {
    	return this._investment;
    };

    this.fnSetInvestment = function(value) {
    	this._investment = value;
    };

    // funções do serviço

    // init do serviço
    this.fnInit = function() {
    	var list = this.fnGetList();

    	// gerando texto para taxa a.a.
        window.angular.forEach(list, function(item) {
            var value = _rico.config.service.indexes[item.index.name];

            item.rateText = item.currentInterestRate + '%';

            // se houver valor de IPCA ou SELIC, exibe a informação também na view
            if(value) {
                item.rateText += '\n+\n' +
                    _rico.utils.fnParseFloat(value * 100) + // valor da taxa
                    '% (' + item.index.name + ')'; // nome da taxa
            }
        });
    };

    // validação das informações do formulário
    this.fnValidate = function() {
        var invTime = this.fnGetInvTime(),
        	investment = this.fnGetInvestment(),
        	message = null;

        // não foi passado 'tempo de investimento'
        if(!_rico.utils.fnIsNumber(invTime)) {
            message = _rico.config.message.ERR_INV_TIME_EMPTY;
        }
        // não foi passado 'valor a investir'
        else if(!_rico.utils.fnIsNumber(investment)) {
            message = _rico.config.message.ERR_INV_EMPTY;
        }
        // 'tempo de investimento' com valor menor que o mínimo
        else if(invTime < _rico.config.view.invTimeMin) {
            message = _rico.config.message.ERR_INV_TIME_MIN;
        }
        // 'tempo de investimento' com valor maior que o máximo
        else if(invTime > _rico.config.view.invTimeMax) {
            message = _rico.config.message.ERR_INV_TIME_MAX;
        }
        // 'valor a investir' com valor menor que o mínimo
        else if(investment < _rico.config.view.invMin) {
            message = _rico.config.message.ERR_INV_MIN;
        }

        return message;
    };

    // busca de itens na tabela
    this.fnSearch = function () {
        var invTime = this.fnGetInvTime(),
        	investment = this.fnGetInvestment(),
        	list = this.fnGetList(),
        	vself = this,
        	response = [];

        window.angular.forEach(list, function(item) {
        	// entra na lista de resposta se o 'valor a investir' for suficiente
            if (item.minimumValue < investment) {
            	// gera o 'valor a reter' de cada item da resposta
                item.retainValue = _rico.utils.fnParseFloat(vself.fnGetRetainValue(item));
                // adiciona o item atual à lista de resposta
                this.push(item);
            }
        }, response);

        // ordenação por 'valor a reter'
        response = _rico.search.fnSortByRetainValue(response);

        // gerando o gráfico com a resposta atual
        _rico.chart.fnGenerate(response);

        return response;
    };

    // reset das informações da tabela
    this.fnReset = function () {
        var list = this.fnGetList(),
        	response = [];

        // zerando 'valor a reter'
        window.angular.forEach(list, function(item) {
            item.retainValue = null;
        }, response);

        // ordenação por id
        response = _rico.search.fnSortById(response);

        return response;
    };

    // cálculo do 'valor a reter'
    this.fnGetRetainValue = function(item) {
	    var invTime = this.fnGetInvTime(),
        	investment = this.fnGetInvestment(),
            rate = item.currentInterestPercentageValue,
            value = _rico.config.service.indexes[item.index.name];

        // se houver valor de IPCA ou SELIC, soma com a taxa a.a. atual
	    if(value) {
	        rate += value;
	    }

	    // transformando taxa a.a. somada em taxa a.d.
	    rate /= 365;

	    // soma o valor a investir com o lucro (investimento * tempo investido * taxa)
	    return investment + (investment * invTime * rate);
	};
});

// controller da view
_rico.angular.controller = _rico.angular.module.controller(_rico.config.angular.controller,
function ($scope, $http, service) {
    $scope.invTimeStep = _rico.config.view.invTimeStep;
    $scope.invStep = _rico.config.view.invStep;
    $scope.listIsLoading = true;
    $scope.listIsEmpty = false;
    $scope.chartIsEmpty = true;
    $scope.errorMessage = null;

    // gráfico para obter a lista de dados
    $http({
        method: 'GET',
        url: _rico.config.service.treasury
    })
    .then(function success(response) {
        $scope.listIsLoading = false;
        $scope.list = response.data;

        // setando o resultado da resposta na lista
        service.fnSetList(response.data);

        // iniciando serviço
        service.fnInit();
    });

    // iniciando módulo do gráfico
    _rico.chart.fnInit();

	// busca de itens na tabela
    $scope.search = function () {
    	// setando no serviço os valores atuais
    	service.fnSetInvTime($scope.invTime);
    	service.fnSetInvestment($scope.investment);

    	// gerando mensagem de erro, caso existam
        $scope.errorMessage = service.fnValidate($scope.invTime, $scope.investment);

        // caso não haja erros
        if(!$scope.errorMessage) {
            $scope.list = service.fnSearch($scope.invTime, $scope.investment);
            $scope.listIsEmpty = $scope.chartIsEmpty = _rico.utils.fnListIsEmpty($scope.list);
        }
    };

    // reset das informações da tabela
    $scope.reset = function() {
    	// reset da lista
        service.fnReset();

        // definindo dados com a lista inicial
        $scope.list = service.fnGetList();
        $scope.listIsEmpty = false;
        $scope.chartIsEmpty = true;

        // limpando o chart
        _rico.chart.fnEmpty();
    };
});

// inject no controller
_rico.angular.controller.$inject = [ '$scope', '$http', _rico.config.angular.service ];
