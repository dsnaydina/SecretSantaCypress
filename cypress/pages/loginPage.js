export class LoginPage {
    elemets = {
        loginField: () => cy.get(':nth-child(3) > .frm'),
        passwordField: () => cy.get(':nth-child(4) > .frm'),
        loginButton: () => cy.get('.btn-main')
    };

    login(login, password) {
       
        this.elemets.loginField().type(login)
        this.elemets.passwordField().type(password)
        this.elemets.loginButton().click()   
    }
}