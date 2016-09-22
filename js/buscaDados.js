// Para versão 4 do NodeJS

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

const porta = 3000;
const hostname = 'localhost';

var tesouro = [
  {
    "id": 111,
    "name": "Tesouro IPCA+ com Juros Semestrais 2035 (NTNB)",
    "type": {
      "name": "NTN-B"
    },
    "index": {
      "name": "IPCA"
    },
    "value": 3007.02,
    "currentUnitValue": 3034.05,
    "minimumQuantity": 0.01,
    "minimumValue": 30.34,
    "currentInterestRate": 5.86,
    "currentInterestPercentageValue": 0.0586,
    "issueDate": "2006-03-07",
    "maturityDate": "2035-05-15"
  },
  {
    "id": 103,
    "name": "Tesouro IPCA+ 2024 (NTNB Princ)",
    "type": {
      "name": "NTNB PRINC"
    },
    "index": {
      "name": "IPCA"
    },
    "value": 1854.52,
    "currentUnitValue": 1867.71,
    "minimumQuantity": 0.01,
    "minimumValue": 18.68,
    "currentInterestRate": 5.85,
    "currentInterestPercentageValue": 0.0585,
    "issueDate": "2005-08-01",
    "maturityDate": "2024-08-15"
  },
  {
    "id": 153,
    "name": "Tesouro Selic 2021 (LFT)",
    "type": {
      "name": "LFT"
    },
    "index": {
      "name": "SELIC"
    },
    "value": 8065.98,
    "currentUnitValue": 8084.67,
    "minimumQuantity": 0.01,
    "minimumValue": 80.85,
    "currentInterestRate": 0.03,
    "currentInterestPercentageValue": 0.0003,
    "issueDate": "2015-02-25",
    "maturityDate": "2021-03-01"
  },
  {
    "id": 149,
    "name": "Tesouro IPCA+ 2019 (NTNB Princ)",
    "type": {
      "name": "NTNB PRINC"
    },
    "index": {
      "name": "IPCA"
    },
    "value": 2481.31,
    "currentUnitValue": 2495.38,
    "minimumQuantity": 0.01,
    "minimumValue": 24.95,
    "currentInterestRate": 6.18,
    "currentInterestPercentageValue": 0.0618,
    "issueDate": "2013-01-11",
    "maturityDate": "2019-05-15"
  },
  {
    "id": 154,
    "name": "Tesouro Prefixado 2019 (LTN)",
    "type": {
      "name": "LTN"
    },
    "index": {
      "name": "prefixado"
    },
    "value": 765.28,
    "currentUnitValue": 769.74,
    "minimumQuantity": 0.01,
    "minimumValue": 7.7,
    "currentInterestRate": 12.02,
    "currentInterestPercentageValue": 0.1202,
    "issueDate": "2016-01-20",
    "maturityDate": "2019-01-01"
  },
  {
    "id": 155,
    "name": "Tesouro Prefixado 2023 (LTN)",
    "type": {
      "name": "LTN"
    },
    "index": {
      "name": "prefixado"
    },
    "value": 484.67,
    "currentUnitValue": 488.45,
    "minimumQuantity": 0.01,
    "minimumValue": 4.88,
    "currentInterestRate": 12.05,
    "currentInterestPercentageValue": 0.1205,
    "issueDate": "2016-01-20",
    "maturityDate": "2023-01-01"
  },
  {
    "id": 157,
    "name": "Tesouro Prefixado com Juros Semestrais 2027 (NTNF)",
    "type": {
      "name": "NTN-F"
    },
    "index": {
      "name": "prefixado"
    },
    "value": 900.26,
    "currentUnitValue": 906.81,
    "minimumQuantity": 0.01,
    "minimumValue": 9.07,
    "currentInterestRate": 12.01,
    "currentInterestPercentageValue": 0.1201,
    "issueDate": "2016-01-20",
    "maturityDate": "2027-01-01"
  },
  {
    "id": 156,
    "name": "Tesouro IPCA+ com Juros Semestrais 2026 (NTNB)",
    "type": {
      "name": "NTN-B"
    },
    "index": {
      "name": "IPCA"
    },
    "value": 2934.62,
    "currentUnitValue": 2961.12,
    "minimumQuantity": 0.01,
    "minimumValue": 29.61,
    "currentInterestRate": 5.91,
    "currentInterestPercentageValue": 0.0591,
    "issueDate": "2016-01-20",
    "maturityDate": "2026-08-15"
  },
  {
    "id": 147,
    "name": "Tesouro IPCA+ com Juros Semestrais 2050 (NTNB)",
    "type": {
      "name": "NTN-B"
    },
    "index": {
      "name": "IPCA"
    },
    "value": 2966.44,
    "currentUnitValue": 3014.3,
    "minimumQuantity": 0.01,
    "minimumValue": 30.14,
    "currentInterestRate": 5.84,
    "currentInterestPercentageValue": 0.0584,
    "issueDate": "2012-05-29",
    "maturityDate": "2050-08-15"
  },
  {
    "id": 138,
    "name": "Tesouro IPCA+ 2035 (NTNB Princ)",
    "type": {
      "name": "NTNB PRINC"
    },
    "index": {
      "name": "IPCA"
    },
    "value": 1001.37,
    "currentUnitValue": 1014.14,
    "minimumQuantity": 0.01,
    "minimumValue": 10.14,
    "currentInterestRate": 5.86,
    "currentInterestPercentageValue": 0.0586,
    "issueDate": "2010-03-09",
    "maturityDate": "2035-05-15"
  }
];

var indexes = [{
    "SELIC": 0.1347, 
    "IPCA": 0.1067 
}];

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/tesouro', function(req, res) {
  res.json(tesouro);
});

app.get('/indexes', function(req, res) {
  res.json(indexes);
});

// app.post('/tesouro', function(req, res) {
//   tesouro.push(req.body);
//   res.json(true);
// });

app.set('port', porta);

//para criar a porta da url "http://localhost:3000/tesouro"
app.listen(app.get('port'), function() {
	console.log('Servidor Rico, banco em http://localhost:3000/tesouro');	    
});
