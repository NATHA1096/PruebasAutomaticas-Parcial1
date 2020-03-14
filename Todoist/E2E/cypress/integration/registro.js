const fullNameCantBeEmpty = "Full name can't be empty";
const passwordCharacters = 'Password must be at least 8 characters long';
const emailAlreadyRegistered = "Your email is already registered with us";
const agreeTerms = "Please agree to the Terms of Service and Privacy Policy.";

describe('Todoist Register', () => {

    before( () => {
        cy.visit('https://todoist.com/');
    });

    /* Escenarios fallidos */

    it('Register with empty fields', ()=> {
        cy.visit('https://todoist.com/Users/showRegister?success_page=');
        cy.contains('Signup').click()
        cy.screenshot();
        cy.get('#sign_up_form').find('#submit_button').click();
        cy.contains(fullNameCantBeEmpty);
        cy.screenshot();
    });

    it('Register with an email already taken', ()=> {
        cy.visit('https://todoist.com/Users/showRegister?success_page=');
        cy.contains('Signup').click()        
        cy.get('#sign_up_form').find('input[id="full_name"]').click().type("Nathalia")
        cy.get('#sign_up_form').find('input[id="email"]').click().type("nathaalvac@gmail.com")
        cy.get('#sign_up_form').find('input[type="password"]').click().type("12345678")
        cy.get('#sign_up_form').find('input[type="checkbox"]').check()
        cy.screenshot();
        cy.get('#sign_up_form').find('#submit_button').click();
        cy.contains(emailAlreadyRegistered);
        cy.screenshot();
    });
    
    it('Register with a password less than 8 characters', ()=> {
        cy.visit('https://todoist.com/Users/showRegister?success_page=');
        cy.contains('Signup').click()        
        cy.get('#sign_up_form').find('input[id="full_name"]').click().type("Nathalia")
        cy.get('#sign_up_form').find('input[id="email"]').click().type("test_exitosa1@example.com")
        cy.get('#sign_up_form').find('input[type="password"]').click().type("1234")
        cy.screenshot();
        cy.get('#sign_up_form').find('#submit_button').click();
        cy.contains(passwordCharacters);
        cy.screenshot();
    });

    it('Register without check the terms and conditions', ()=> {
        cy.visit('https://todoist.com/Users/showRegister?success_page=');
        cy.contains('Signup').click()        
        cy.get('#sign_up_form').find('input[id="full_name"]').click().type("Nathalia")
        cy.get('#sign_up_form').find('input[id="email"]').click().type("test_exitosa1@example.com")
        cy.get('#sign_up_form').find('input[type="password"]').click().type("12345678")
        cy.screenshot();
        cy.get('#sign_up_form').find('#submit_button').click();
        cy.contains(agreeTerms);
        cy.screenshot();
    });

    /* Escenarios exitoso */
    it('Register sucessfully', ()=> {
        cy.visit('https://todoist.com/Users/showRegister?success_page=');
        cy.contains('Signup').click()        
        cy.get('#sign_up_form').find('input[id="full_name"]').click().type("Nathalia")
        cy.get('#sign_up_form').find('input[id="email"]').click().type("test_exitosa2@example.com")
        cy.get('#sign_up_form').find('input[type="password"]').click().type("12345678")
        cy.get('#sign_up_form').find('input[type="checkbox"]').check()
        cy.screenshot();
        cy.get('#sign_up_form').find('#submit_button').click();
        cy.screenshot();
        cy.contains("Let's go").click();
        cy.screenshot();
        cy.contains('Create my Todoist').click();
        cy.screenshot();
        cy.contains('Open my Todoist').click();
        cy.screenshot();
        cy.get('.view_header').contains('Welcome')
        cy.screenshot();
    });
    
})