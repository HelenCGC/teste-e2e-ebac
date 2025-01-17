# [US-0001] – Adicionar item ao carrinho 

Descrição

Como cliente da EBAC-SHOPQuero adicionar produtos no carrinho Para realizar a compra dos itens 
Regras de negócio:
• Não é permitido inserir mais de 10 itens de um mesmo produto ao carrinho;
• Os valores não podem ultrapassar a R$ 990,00;
• Valores entre R$ 200 e R$ 600 , ganham cupom de 10%
• Valores acima de R$ 600 ganham cupom de 15%

### Pré-requisito:

#### Para instalar as dependencias:

```
npm install
```

#### Para executar em moodo Headlesss via console:

```
npx cypress run
```

#### Para executar via Dashboard:

```
npx cypress open
```

Após abrir o dashboard, selecione um dos navegadores (De preferencia Electron) e siga com as execuções.

### Bibliotecas de apoio:

-Cypress: Framework de automação: https://cypress.io/
