const users = require("../fixtures/users.json");
const loginPage = require("../fixtures/pages/loginPageSelectors.json");
const boxPage = require("../fixtures/pages/boxPage.json");
const generalElements = require("../fixtures/pages/general.json");
const dashboardElements = require("../fixtures/pages/dashboardPage.json");
const invitePage = require("../fixtures/pages/invitePage.json");
const inviteeBoxPage = require("../fixtures/pages/inviteeBoxPage.json");
const inviteeDasboardPage = require("../fixtures/pages/inviteeDashboardPage.json");
const boxListPage = require("../fixtures/pages/boxListPage.json");
const randomizer = require("../fixtures/pages/randomizer.json");

import { faker } from "@faker-js/faker";

describe("User can create a box and run it", () => {
  // user 1 logins
  // user 1 creates a box
  // user 1 gets an invitation
  // user 2 opens up an invitation
  // user 2 fills up a personal information
  // user 3 opens up an invitation
  // user 3 fills up a personal information
  // user 4 opens up an invitation
  // user 4 fills up a personal information
  // user 1 logins
  // user 1 runs a randomiser

  let newBoxName = faker.word.noun(8);
  let maxAmount = 50;
  let currency = "Евро";
  let inviteLink;
  let wish = faker.word.noun() + faker.word.adjective() + faker.word.adverb();
  let boxId;
  let ward;

  it("User logins and creates a box", () => {
    // user author logins
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);

    // user author creates a box
    cy.contains("Создать коробку").click();
    cy.get(boxPage.boxNameField).type(newBoxName);
    cy.get(boxPage.boxIdField).then((boxId) => {
      boxId = Cypress.$(boxId).val(); // saves box Id
      cy.log(boxId);
    });
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.boxIcon).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.giftPriceToggle).check({ force: true });
    cy.get(boxPage.maxAmount).type(maxAmount);
    cy.get(boxPage.currency).select(currency);
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();

    //user author checks created box

    cy.get(dashboardElements.createdBoxName).should("have.text", newBoxName);
    cy.get(".layout-1__header-wrapper-fixed .toggle-menu-item span")
      .invoke("text")
      .then((text) => {
        expect(text).to.include("Участники");
        expect(text).to.include("Моя карточка");
        expect(text).to.include("Подопечный");
      });
  });

  it("Add participants", () => {
    cy.get(generalElements.submitButton).click();
    cy.get(invitePage.inviteLink)
      .invoke("text")
      .then((link) => {
        inviteLink = link;
      });

    cy.clearCookies();
  });

  //  user 1 opens up an invitation
  // user 1 fills up a personal information
  it("Approve link as user1", () => {
    cy.visit(inviteLink);
    cy.get(generalElements.submitButton).click();
    cy.get(
      ".layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > a > .base--clickable > .header-item__text > .txt--med"
    ).click();
    cy.login(users.user1.email, users.user1.password);
    cy.createUserCard(wish);
    // cy.get(generalElements.submitButton).click();
    // cy.contains("Создать карточку участника").should("exist");
    // cy.get(generalElements.submitButton).click();
    // cy.contains("Имя и контактные данные").should("exist");
    // cy.get(generalElements.arrowRight).click();
    // cy.get(generalElements.arrowRight).click();
    // cy.get(inviteeBoxPage.wishesInput).type(wish);
    // cy.log(wish);
    // cy.get(generalElements.arrowRight).click();
    // cy.get(inviteeDasboardPage.noticeForInvitee)
    //   .invoke("text")
    //   .then((text) => {
    //     expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
    //   });
    cy.clearCookies();
  });

  //  user 2 opens up an invitation
  // user 2 fills up a personal information
  it("Approve link as user2", () => {
    cy.visit(inviteLink);
    cy.get(generalElements.submitButton).click();
    cy.get(
      ".layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > a > .base--clickable > .header-item__text > .txt--med"
    ).click();
    cy.login(users.user2.email, users.user2.password);
    cy.createUserCard(wish);
    cy.clearCookies();
  });

  //  user 3 opens up an invitation
  // user 3 fills up a personal information
  it("Approve link as user3", () => {
    cy.visit(inviteLink);
    cy.get(generalElements.submitButton).click();
    cy.get(
      ".layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > a > .base--clickable > .header-item__text > .txt--med"
    ).click();
    cy.login(users.user3.email, users.user3.password);
    cy.createUserCard(wish);
    cy.clearCookies();
  });

  // user 1 logins
  // user 1 runs a randomiser

  it("Randomizer", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.get(
      '.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account/boxes"] > .header-item'
    ).click({ force: true });
    cy.get(boxListPage.firstBox).click();
    cy.get(boxPage.goToRandomizer).click({ force: true });
    cy.get(generalElements.submitButton).click({ force: true });
    cy.contains("Проведение жеребьевки").should("exist");
    cy.get(randomizer.submitRandomizer).click({ force: true });
    //cy.contains("Жеребьевка проведена!").should("exist");
    cy.clearCookies();

    //cy.get(generalElements.randomizer).click();
    // cy.contains("Я тоже участвую").should("exist");
    // cy.get(generalElements.arrowRight).click();
    // cy.get(randomizer.user1NameField).type(users.user1.name);
    // cy.get(randomizer.user1EmailFiled).type(users.user1.email);
    // cy.get(randomizer.user2NameField).type(users.user2.name);
    // cy.get(randomizer.user2EmailFiled).type(users.user2.email);
    // cy.get(randomizer.user3NameField).type(users.user3.name);
    // cy.get(randomizer.user3EmailFiled).type(users.user3.email);
    // cy.get(generalElements.arrowRight).click({ force: true });
    // cy.get(generalElements.arrowRight).click({ force: true });
    // cy.contains("Жеребьевка проведена!").should("exist");
    // cy.clearCookies();
  });

  it("User1 reads notification", () => {
    cy.visit("/login");
    cy.login(users.user1.email, users.user1.password);
    cy.checkNotification(newBoxName);
    cy.clearCookies();
  });

  it("User2 reads notification", () => {
    cy.visit("/login");
    cy.login(users.user2.email, users.user2.password);
    cy.checkNotification(newBoxName);
    cy.clearCookies();
  });

  it("User3 reads notification", () => {
    cy.visit("/login");
    cy.login(users.user3.email, users.user3.password);
    cy.checkNotification(newBoxName);
    cy.clearCookies();
  });

  //user 1 deletes a box UI
  // Cypress._.times(10, () => {
  it("Delete box", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.get(
      '.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account/boxes"] '
    ).click();
    cy.get(boxListPage.firstBox).click();
    cy.get(
      ".layout-1__header-wrapper-fixed > .layout-1__header-secondary > .header-secondary > .header-secondary__right-item > .toggle-menu-wrapper > .toggle-menu-button > .toggle-menu-button--inner"
    ).click();
    cy.get(
      ".layout-1__header-wrapper-fixed > .layout-1__header-secondary__menu > .header-secondary-menu > .organizer-menu > .organizer-menu__wrapper > :nth-child(5) > .txt--med"
    ).click();
    cy.get(":nth-child(2) > .form-page-group__main > .frm-wrapper > .frm").type(
      "Удалить коробку"
    );
    cy.get(".btn-service").click();
  });
  //});

  // it("Deleting a box using API", () => {
  //   cy.visit("/login");
  //   cy.login(users.userAutor.email, users.userAutor.password);

  //   cy.request({
  //     method: "DELETE",
  //     headers: {
  //       Cookie:
  //         "connect.sid=s%3Aa4aQAzd5MAjNnN2dYPimh4YQGG8SXcIQ.bIX5ra34d2kZeeMMUizRY57JBMtnt2AN8fBHqD66Le8; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwMDEyMjMsImlhdCI6MTY3NjYyNTI0NSwiZXhwIjoxNjc2NjI4ODQ1fQ.hYLs7Im7sKRjxdHUQUxkORhOKA11Zgp7-VL_Sbr4udI",
  //     },
  //     url: "`https://staging.lpitko.ru/api/box/${boxId}`",
  //   }).then((response) => {
  //     expect(response.status).to.equal(200);
  //   });
  // });
});
