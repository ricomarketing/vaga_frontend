#vigilant octo
Esse nome foi gerado pelo github depois de eu perder 15 minutos pensando em um bom nome.
Nesse README eu vou descrever tudo que pensei durante a criação desse projeto e como executa-lo :)

##Instalação
### Prerequisites

- [Node.js and npm](nodejs.org) Node >= 4.x.x, npm >= 2.x.x

```sh
  npm install -g gulp-cli
  npm install -g bower
  npm install -g bower-npm-resolver
  npm install 
  bower install
```

1. Use `gulp serve` para iniciar um servidor local de desenvolvimento
2. Use `gulp build` para gerar a pasta build para produção



## Arquitetura CSS / SASS
Eu resolvi deixar que cada pequeno módulo do CSS fosse um arquivo SASS separado e que ele ficasse na pasta do módulo junto com o controller e a view.
Talvez um solução melhor tivesse sido repensar usando uma arquitetura mais forte como SMACSS ou Atomic, mas acredito que o intuito do teste seja mais para testar o javascript, então resolvi não me atentar muito a isso (Ou até mesmo o ponto de ser obrigatório usar SASS em vez de me deixarem usar Stylus hahaha)

## ES6
Como no readme vocês deixavam bem claro sobre o Typescript, eu fiquei pensando se deveria usar Ecma6 ou não.
Devia ter perguntado, estou com saudades de algumas coisas dele hahaha.

## Gulp
O Gulp pode parecer um pouco chato e extenso demais.
Realmente é !  Ele é baseado em alguns outros gulps que fiz para angular e alguns outros que vi por ai e como resolvi não me dedicar a isso, acabei deixando sem muita coisa


## App
### Modificações
Tive que criar uma nova API, em um dominio meu do Apiary, pois ao tentar renderizar o JSON com comentários, ele retornava erros ao renderizar

## Calculo
Eu acredito que o calculo que realizei para trazer o retorno do investimento não esteja correto, precisava entender um pouco melhor como fazer esses calculos para dar 100% de certeza

## Sobre o usuario que está realizando o teste.
Como eu não queria deixar publico que estava realizando esse teste, criei essa conta para isso.
Você pode me encontrar em @herberthenrique
