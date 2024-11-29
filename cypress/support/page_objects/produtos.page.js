class ProdutosPage {

    visitarURL() {
        cy.visit("produtos");
    }

    buscarProduto(nomeProduto) {
        cy.get('[name="s"]').eq(1).type(nomeProduto);
        cy.get(".button-search").eq(1).click();
    }

    addProdutoCarrinho(tamanho, cor, quantidade ) {
        cy.get('.button-variable-item-' + tamanho).click()
        cy.get(`li[title=${tamanho}]`).click()
        cy.get('.button-variable-item-' + cor).click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('button[type=submit]').contains('Comprar').click()
    }

}

export default new ProdutosPage();