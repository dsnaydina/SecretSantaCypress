describe('Santa test suit 1', () => {
    beforeEach("Visit", () => {
        cy.visit('https://staging.lpitko.ru/');
      });

    it('Header should be visible', () => {
        cy.contains('тайный санта').should('be.visible');
        cy.get('#root > div.layout-1 > section.layout-1__header-wrapper-fixed > header > section > div > a > div > div > span').first().should('have.text', 'Вход и регистрация');
     });
    it('Login should be visible', () => {
        cy.get('#root > div.layout-1 > section.layout-1__header-wrapper-fixed > header > section > div > a > div > div > span').first().should('have.text', 'Вход и регистрация');
         
    });
    it('Santas count should be visible', () => {
       cy.get('#root > div.layout-1 > section.layout-1__header-wrapper-fixed > header > section > span').first().should('have.text', '32 Сант в этом году');
        
    });
    it('Create a box exists', () => {
        cy.get('#root > div.layout-1 > section.layout-1__main-wrapper > div.layout-1__main > section > div > section > div > div.home-page-buttons > a:nth-child(1) > div > span').first().should('have.text', 'Создать коробку');   
    })
})


  
//cy.get('#root > div.layout-1 > section.layout-1__header-wrapper-fixed > header > section > div > a > div > div > span').first().should('have.text', 'Вход и регистрация');

//<button id="onetrust-accept-btn-handler" tabindex="0">Согласиться с использованием всех файлов cookie</button>