# Teste para Vaga Front-End AngularJS

Este exercício será utilizado para avaliar profissionais para a vaga de Frontend Pleno na Rico.com.vc. 


## Como participar:

Para participar do teste, faça um Fork deste repositório e crie uma Branch nomeada com seu nome e sobrenome no formato **nome_sobrenome**.

Execute o exercício descrito a seguir e ao finalizar, faça um pull-request da sua branch para a master deste projeto.

O projeto deve ser executado em Angular 1.5 com uma geração de Bundle utilizando o Gulp. Utilizar WebComponents no projeto é um diferencial.

O layout é Livre e seu design será parte menor da avaliação, o importante é mostrar que você sabe utilizar CSS3 com propósito. A folha de estilos deve ser criada utilizando SASS.

A linguagem utilizada deve ser o Vanilla JS. Por favor não envie o exercício utilizando typescript. O que deve ser avaliado é seu conhecimento em JS.


## Exercício


* Acesse http://docs.ricocomvc.apiary.io/#
* Neste nesta URL, haverão 2 Endpoints Mock para acesso a produtos de Tesouro Direto e Índices de Mercado.
* Crie uma página com um formulário contendo campos para serem informados de **tempo de investimento** e **valor investido**, e uma tabela contendo informações relevantes sobre cada oferta no endpoint **/treasury**.
* O Tempo de investimento deve ser informada em **dias (até 2 anos)**. Você pode usar Input ou um Slider e configurar um Stepping de 30 em 30 dias.
* O Valor pode ser qualquer um, mas lembre-se que os produtos possem um **mínimo** de investimento.
* A Tabela deve ser **ordenada por rentabilidade**. A rentabilidade de cada produto deve ser calculada utilizando o Endpoint de **Indices** e os campos de **valor** e **tempo de investimento** informados.
* Deve ser incluída na página um **gráfico em barras** mostrando a diferença entre os **5 melhores** investimentos da tabela.
