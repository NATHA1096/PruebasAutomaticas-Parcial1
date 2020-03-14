const invalidEmail = 'Invalid email address.';
const blankPassword = 'Blank password.';
const wrongEmailOrPass = 'Wrong email or password.';

describe('Todoist login', () => {

    before( () => {
        cy.visit('https://todoist.com/');
    });

    /* Escenarios fallidos*/

    it('Visits Todoist and login with empty fields', ()=> {
        cy.visit('https://todoist.com/users/showlogin')
        cy.screenshot();
        cy.get('.submit_btn').click()
        cy.contains(invalidEmail);
        cy.screenshot();
    });

    it('Login without password', ()=> {
        cy.visit('https://todoist.com/users/showlogin')
        cy.get('#login_form').find('input[id="email"]').click().type("nathaalvac@gmail.com")
        cy.screenshot();
        cy.get('.submit_btn').click()
        cy.contains(blankPassword);
        cy.screenshot();
    });
    
    it('Login with a wrong password', ()=> {
        cy.visit('https://todoist.com/users/showlogin')
        cy.get('#login_form').find('input[id="email"]').click().type("nathaalvac@gmail.com")
        cy.get('#login_form').find('input[id="password"]').click().type("3523424")
        cy.screenshot();
        cy.get('.submit_btn').click()
        cy.contains(wrongEmailOrPass);
        cy.screenshot();
    });

    /* Escenario exitoso*/
    it('Login successfully', ()=> {
        cy.visit('https://todoist.com/users/showlogin')
        cy.get('#login_form').find('input[id="email"]').click().type("nathaalvac@gmail.com")
        cy.get('#login_form').find('input[id="password"]').click().type("12345678")
        cy.screenshot(); 
        cy.get('.submit_btn').click()
        cy.get('.view_header').contains('Today')
        cy.screenshot();
    });
})