/**
 *
 * Módulo de gráfico
 *
 */

_rico.chart = {

	// referência interna para o google charts
	googleCharts: window.google.charts,

	// elemento DOM para a DIV do gráfico
	element: null,

	// função para iniciar o módulo
	fnInit: function() {
		// elemento do gráfico
		_rico.chart.element = document.getElementById(_rico.config.chart.id);

		// iniciando google charts
		_rico.chart.googleCharts.load('current', { packages: ['corechart'] });
	},

	// função para limpar um gráfico do google
	fnEmpty: function() {
	    _rico.chart.element.innerHTML = '';
	},

	// função para o google charts, definindo configurações para o gráfico
	fnDraw: function(list) {
	    var data,
	    	view,
	    	info = [],
	    	chart = new _rico.chart.googleVisualization.ColumnChart(_rico.chart.element);

	    // colunas do gráfico
	    info.push([ 'Título', 'Valor a Reter (R$)' ]);

	    // itens do gráfico
	    for(var i = 0, len = list.length; i < len && i < _rico.config.chart.maxItems; i++) {
	        info.push([ list[i].name, list[i].retainValue ]);
	    }

	    // transformando a lista em tipo de dados do google charts
	    data = _rico.chart.googleVisualization.arrayToDataTable(info);

	    // definindo view a partir dos dados
	    view = new _rico.chart.googleVisualization.DataView(data);

	    // desenhando o gráfico na view
	    chart.draw(view, {
	        width: '100%',
	        height: 400,
	        legend: { position: 'none' },
	        hAxis: { textStyle: { fontSize: 12, fontName: 'Arial' } },
	        vAxis: { textStyle: { fontSize: 12, fontName: 'Arial' } },
			tooltip: { textStyle: { fontSize: 12, fontName: 'Arial' } }
	    });
	},

	// gera o gráfico do google a partir de uma lista
	fnGenerate: function(list) {
		// se a lista está vazia, limpa o gráfico
	    if(list.length === 0) {
	        _rico.chart.fnEmpty();
	    }
	    else {
	        _rico.chart.googleCharts.setOnLoadCallback(function() {
	        	_rico.chart.googleVisualization = window.google.visualization;
	        	_rico.chart.fnDraw(list);
	        });
	    }
	}
};
