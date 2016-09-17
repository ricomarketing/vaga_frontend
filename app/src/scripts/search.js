/**
 *
 * Módulo com funções para a busca de itens na tabela
 *
 */

_rico.search = {

	// função para ordenar a lista por id
	fnSortById: function(list) {
	    return list.sort(function(v1, v2) {
            return v1.id - v2.id;
        });
	},

	// função para ordenar a lista por 'valor a reter'
	fnSortByRetainValue: function(list) {
	    return list.sort(function(v1, v2) {
            return v2.retainValue - v1.retainValue || v1.id - v2.id;
        });
	},
};
