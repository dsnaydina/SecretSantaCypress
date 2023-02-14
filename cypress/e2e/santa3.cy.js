import { faker } from '@faker-js/faker';
import { LoginPage } from '../pages/loginPage';
const loginPageElements = require("../fixtures/pages/loginPageSelectors.json")

describe("Santa login UI", () => {
    it("User can not log in with old password ", () => {
        let loginPage = new LoginPage();

        let oldPassword = "test111"
        let newPassword = faker.internet.password(8); //8 char

        cy.visit('/');
        cy.get('.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > a > .base--clickable > .header-item__text > .txt--med').click({ forse: true});
        loginPage.login("manson13@54.mk", oldPassword)
        
         
        cy.contains('Коробки').should("exist");
        cy.changePassword("dariaTest", newPassword);
        cy.log(newPassword);
        cy.contains("Выйти с сайта").click();
        
        cy.visit('/');
        cy.get('.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > a > .base--clickable > .header-item__text > .txt--med').click({ force: true});
        cy.get(loginPageElements.loginField).type("manson13@54.mk");
        cy.get(loginPageElements.passwordField).type(oldPassword);
        cy.get(loginPageElements.loginButton).click();
        
        
        //loginPage.login("manson13@54.mk", oldPassword)
        cy.contains("Неверное имя пользователя или пароль").should('exist');

        cy.get(':nth-child(4) > .frm').clear().type(newPassword);
        cy.get('.btn-main').click();
        cy.changePassword("dariaTest", oldPassword)
        cy.log(oldPassword);
    })
})


 