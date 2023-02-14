
describe (('Santa tests suit 2'), () => {

    beforeEach(() => {
        cy.visit('/');
        cy.get('#root > div.layout-1 > section.layout-1__header-wrapper-fixed > header > section > div > a > div > div > span')
        .should('have.text', 'Вход и регистрация');
        cy.get(".layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > a > .base--clickable > .header-item__text > .txt--med")
        .click();
        cy.get(':nth-child(3) > .frm').type("manson13@54.mk");
        cy.get(':nth-child(4) > .frm').type("test1234");
        cy.get('.btn-main').click()    });

    let url = Cypress.config('baseUrl');


    it( 'Check links', () => {
    cy.contains('Коробки').click({force:true});
    cy.get('.toggle-menu-item--active > .txt--med').should('be.visible');
    cy.url().should("include", "/account/boxes");
//manson13@54.mk
//test1234
//login dariatest
});

it( 'Create a box', () => {
     
    cy.contains('Коробки').click({force:true});
    cy.get('.toggle-menu-item--active > .txt--med').should('be.visible');
    cy.url().should("include", "/account/boxes");
    cy.get('.btn-main').click({force:true});
    cy.url().should("include", "/box/new");
});
it( 'Randomizer', () => {
    
    cy.get('[href="/randomizer"] > .btn-secondary').click();
    cy.get('.form-card__header > .txt-h3--semi').should('be.visible');
    cy.url().should("include", "/randomizer");
});
it( 'Personal account', () => {
     
    cy.get('.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account"] > .header-item > .header-item__text > .txt--med')
    .click();
    cy.get('#account_profile_settings').should('be.visible');
    cy.url().should("include", "/account");
});

})
 


