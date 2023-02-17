// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const users = require("../fixtures/users.json");
const loginPage = require("../fixtures/pages/loginPageSelectors.json");
const generalElements = require("../fixtures/pages/general.json");
const inviteeBoxPage = require("../fixtures/pages/inviteeBoxPage.json");
const inviteeDasboardPage = require("../fixtures/pages/inviteeDashboardPage.json");

Cypress.Commands.add("loginSanta", (email, password) => {
  cy.visit("/login");
  cy.get("input[name=email]").type(email);
  cy.get("input[name=password]").type(password);
  cy.get(
    "#root > div.layout-1 > section.layout-1__main-wrapper > div.layout-1__main > section > div > section > div > div.form-auth__button > div"
  ).click();
  cy.get("#root").should("have.length", 1);
});

Cypress.Commands.add("changePassword", (userName, newPassword) => {
  cy.contains(userName).click({ force: true });
  cy.get(".layout-column-start > :nth-child(1) > .frm").type(newPassword);
  cy.get(
    ":nth-child(4) > .form-page-group__main > .layout-column-start > :nth-child(2) > .frm"
  ).type(newPassword);
  cy.get(".layout-row-end > .btn-service").click();
});

Cypress.Commands.add("login", (userName, password) => {
  cy.get(loginPage.loginField).type(userName);
  cy.get(loginPage.passwordField).type(password);
  cy.get(generalElements.submitButton).click();
});

Cypress.Commands.add("checkNotification", (nexBoxName) => {
  cy.get(generalElements.notificationPage).click({ force: true });
  cy.get(generalElements.knowYourPerson).click({ force: true });
  cy.get(generalElements.submitButton).click({ force: true });
});

Cypress.Commands.add("createUserCard", (wish) => {
  cy.contains("Создать карточку участника").should("exist");
  cy.get(generalElements.submitButton).click();
  cy.contains("Имя и контактные данные").should("exist");
  cy.get(generalElements.arrowRight).click();
  cy.get(generalElements.arrowRight).click();
  cy.get(inviteeBoxPage.wishesInput).type(wish);
  cy.get(generalElements.arrowRight).click();
  cy.get(inviteeDasboardPage.noticeForInvitee)
    .invoke("text")
    .then((text) => {
      expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
    });
});
