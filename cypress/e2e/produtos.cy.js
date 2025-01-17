/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

import produtosPage from "../support/page_objects/produtos.page";

context("[US-0001] – Adicionar item ao carrinho", () => {
  beforeEach(() => {
    produtosPage.visitarURL();
  });

  it("Deve fazer um pedido na loja Ebac Shop e validar os 3 itens incluídos", () => {
    cy.intercept("POST", "**=checkout**").as("postPedidoRecebido");

    cy.fixture("produtos").then((dados) => {
      //Primeiro produto
      produtosPage.buscarProduto(dados[0].nomeProduto);
      produtosPage.addProdutoCarrinho(
        dados[0].tamanho,
        dados[0].cor,
        dados[0].quantidade
      );
      cy.get("div[class=woocommerce-message]").should(
        "contain",
        dados[0].nomeProduto
      );
      //Segundo produto
      produtosPage.buscarProduto(dados[1].nomeProduto);
      produtosPage.addProdutoCarrinho(
        dados[1].tamanho,
        dados[1].cor,
        dados[1].quantidade
      );
      cy.get("div[class=woocommerce-message]").should(
        "contain",
        dados[1].nomeProduto
      );
      //Terceiro produto
      produtosPage.buscarProduto(dados[2].nomeProduto);
      produtosPage.addProdutoCarrinho(
        dados[2].tamanho,
        dados[2].cor,
        dados[2].quantidade
      );
      cy.get("div[class=woocommerce-message]").should(
        "contain",
        dados[2].nomeProduto
      );

      cy.get(".woocommerce-message > .button").contains("Ver carrinho").click();
      cy.get(".checkout-button").click();

      //preenchendo dados checkout
      cy.get("#billing_first_name").type("NomeTeste");
      cy.get("#billing_last_name").type("SobrenomeTeste");
      cy.get("#billing_company").type("EmpresaTeste");
      cy.get("#select2-billing_country-container").click();
      cy.get(".select2-results__option").contains("Brasil").click();
      cy.get("#billing_address_1").type("Endereço Teste");
      cy.get("#billing_address_2").type("ComplementoEndereçoTeste");
      cy.get("#billing_city").type("CidadeTeste");
      cy.get("#select2-billing_state-container").click();
      cy.get(".select2-results__option").contains("Distrito Federal").click();
      cy.get("#billing_postcode").type("72070-135");
      cy.get("#billing_phone").type("61983089358");
      cy.get("#billing_email").type(faker.internet.email());
      cy.get("#createaccount").click();
      cy.get("#account_password").type("teste@senha");
      cy.get("#order_comments").type("Informação Adicional Teste");
      cy.get("#payment_method_cheque").click();
      cy.get("#terms").click();
      cy.get("#place_order").click();

      //Validado Detalhes do Pedido
      cy.wait("@postPedidoRecebido");

      const expectedProducts = [
        {
          name: `${dados[0].nomeProduto} - ${dados[0].tamanho}, ${dados[0].cor}`,
          quantity: `${dados[0].quantidade}`,
        },
        {
          name: `${dados[1].nomeProduto} - ${dados[1].tamanho}, ${dados[1].cor}`,
          quantity: `${dados[1].quantidade}`,
        },
        {
          name: `${dados[2].nomeProduto} - ${dados[2].tamanho}, ${dados[2].cor}`,
          quantity: `${dados[2].quantidade}`,
        },
      ];

      // Seleciona todas as linhas da tabela de pedidos
      cy.get("tr.order_item").each(($row, index) => {
        cy.log(`Validando produto ${index + 1}`); // Log para identificar o produto em validação

        // Valida cada linha
        cy.wrap($row).within(() => {
          cy.get("td.woocommerce-table__product-name.product-name a")
            .should("contain", expectedProducts[index].name) // Valida o nome do produto
            .then(() => {
              cy.log(
                `✔️ Produto ${expectedProducts[index].name} validado com sucesso`
              );
            });

          cy.get("strong.product-quantity")
            .should("contain", expectedProducts[index].quantity) // Valida a quantidade
            .then(() => {
              cy.log(
                `✔️ Quantidade ${expectedProducts[index].quantity} validada com sucesso`
              );
            });
        });
      });
    });
  });
});
