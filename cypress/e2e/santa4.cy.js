import { faker } from '@faker-js/faker';
import { LoginPage } from '../pages/loginPage';
const loginPageElements = require("../fixtures/pages/loginPageSelectors.json")


describe("Santa login - UI API", () => {
    let oldPassword = "test111"
    let loginPage = new LoginPage();

    it("User can not log in with old password UI ", () => {
         let newPassword = faker.internet.password(8); //8 char
        cy.log(newPassword);

        cy.visit('/');
        cy.get('.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > a > .base--clickable > .header-item__text > .txt--med').click({ forse: true});
        loginPage.login("manson13@54.mk", oldPassword)
        cy.contains('Коробки').should("exist");
        cy.changePassword("dariaTest", newPassword);
        cy.log(newPassword);
        cy.contains("Выйти с сайта").click();
        
        cy.visit('/');
        cy.get('.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > a > .base--clickable > .header-item__text > .txt--med').click({ force: true});
              // one way of using page object patter is to create fixture file with selectors and call them 

        cy.get(loginPageElements.loginField).type("manson13@54.mk");
        cy.get(loginPageElements.passwordField).type(oldPassword);
        cy.get(loginPageElements.loginButton).click();
         
        //OR
         //loginPage.login("manson13@54.mk", oldPassword)
        cy.contains("Неверное имя пользователя или пароль").should('exist');

        cy.get(':nth-child(4) > .frm').clear().type(newPassword);
        cy.get('.btn-main').click();
        cy.changePassword("dariaTest", oldPassword)
        cy.log(oldPassword);
    });


    it("User can not log in with old password - API", () => {
        let newPassword = faker.internet.password(8); //8 char
        cy.log(newPassword);
        

        cy.request({
            method: "PUT",
            headers:{ 
                Cookie: "connect.sid=s%3A2-syR_0kfBCY3Db3b5iQqNxC0bYeBmv3.QCk0%2FGuF55RuKPvKzKpyYIk%2BHvVujiLPEHbtV6YQGeo; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwMDEyMjMsImlhdCI6MTY3NjM4MzYyNSwiZXhwIjoxNjc2Mzg3MjI1fQ.epHSrwgUgBAVfw3T87Dhj_waR42TW4jeyXBSJypVv3w"
            },
            url: "https://staging.lpitko.ru/api/account/password",
            body: {password: newPassword}
        }).then((response) => {
            expect(response.status).to.equal(200);
        } );
        cy.visit('/');
        cy.get('.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > a > .base--clickable > .header-item__text > .txt--med').click({ forse: true});
        loginPage.login("manson13@54.mk", newPassword)
        cy.contains('Коробки').should("exist");
        cy.get('.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account"] > .header-item > .header-item__text').click({ forse: true});
        cy.contains("Выйти с сайта").click();

    
        cy.request({
            method: "PUT",
            headers:{ 
                Cookie: "connect.sid=s%3A2-syR_0kfBCY3Db3b5iQqNxC0bYeBmv3.QCk0%2FGuF55RuKPvKzKpyYIk%2BHvVujiLPEHbtV6YQGeo; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwMDEyMjMsImlhdCI6MTY3NjM4MzYyNSwiZXhwIjoxNjc2Mzg3MjI1fQ.epHSrwgUgBAVfw3T87Dhj_waR42TW4jeyXBSJypVv3wonnect.sid=s%3AIeL90bnitQQMAnvfjs1AUChIoWBZ8Es4.whTEKTBYcgUynoERz5x93S7icoShxLSK1OsCFI5ZFoQ; _ym_isad=2; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwMDEyMjMsImlhdCI6MTY3NjM4MTM2MywiZXhwIjoxNjc2Mzg0OTYzfQ.B41qWoTFq2GBr3d8j9bKUyTVzkwy3h9hmKaM1vQyUfQ"
            },
            url: "https://staging.lpitko.ru/api/account/password",
            body: {password: oldPassword}
        }).then((response) => {
            expect(response.status).to.equal(200);
        } );
        cy.visit('/');
        cy.get('.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > a > .base--clickable > .header-item__text > .txt--med').click({ forse: true});
        loginPage.login("manson13@54.mk", oldPassword);
        cy.log(oldPassword);

    })
});

