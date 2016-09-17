/**
 *
 * Módulo com funções úteis
 *
 */

_rico.utils = {

	// indica se a lista em parâmetro possue 0 itens
	fnListIsEmpty: function(list) {
	    return list.length === 0;
	},

	// faz o parser de um valor para float com 2 casas decimais
	fnParseFloat: function(value) {
		return parseFloat(parseFloat(value).toFixed(2));
	},

	// verifica se um valor é um número
	fnIsNumber: function(value) {
		return Number(value) === value;
	}
};
