/**
 *
 * Módulo de configurações
 *
 */

_rico.config = {

	// configurações da view
	view: {
		invTimeStep: 30,
	    invTimeMin: 30,
	    invTimeMax: 730,
	    invStep: 'any',
	    invMin: 1
	},

	// configuração das urls dos serviços iternos usados
	service: {
		treasury: '//private-e4f41b-ricocomvc.apiary-mock.com/treasury',

		// usando valor fixo aqui, pois o serviço está dando erro por ter comentário
		indexes: {
		    SELIC: 0.1347,
		    IPCA: 0.1067
		}
	},

	// configurações usadas no módulo do angular
	angular: {
		application: 'application',
		controller: 'controller',
		service: 'service'
	},

	// configurações usadas no módulo de chart
	chart: {
		id: 'ricoapp_chart',
		maxItems: 5
	},

	// configurações de mensagens para a view
	message: {
	}
};

// definição de mensagens para a view
_rico.config.message.ERR_INV_TIME_EMPTY = 'Digite um valor para o "tempo de investimento"';
_rico.config.message.ERR_INV_EMPTY = 'Digite um valor para o "valor a investir"';
_rico.config.message.ERR_INV_TIME_MIN = 'Digite um valor para o "tempo de investimento" maior ou igual a ' + _rico.config.view.invTimeMin;
_rico.config.message.ERR_INV_TIME_MAX = 'Digite um valor para o "tempo de investimento" menor ou igual a ' + _rico.config.view.invTimeMax;
_rico.config.message.ERR_INV_MIN = 'Digite um valor para o "valor a investir" maior ou igual a ' + _rico.config.view.invMin;
