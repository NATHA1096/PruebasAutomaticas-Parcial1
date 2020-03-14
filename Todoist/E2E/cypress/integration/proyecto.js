describe('Todoist Projects', function() {
    
    asLogin();
    
    /* Escenarios exitosos*/

    it('Add project', function() { 
        cy.wait(2000)       
        cy.get('div[id="left_menu"]').find('button[data-track="navigation|projects_quick_add"]').click({force: true})
        cy.get('form').find('input[id="edit_project_modal_field_name"]').click().type("Project test")
        cy.get('form').find('button[class="color_dropdown_toggle form_field_control"]').click()
        cy.get('div[id="dropdown-select-3-popup"]').find('li[id="dropdown-select-3-option-45"]').click()
        cy.get('form').find('.reactist_switch').click()
        cy.screenshot();
        cy.get('form').find('button[type="submit"]').click()
        cy.get('.left_menu').contains('Project test')
        cy.screenshot();
    });

    it('Delet project', function() {        
        cy.get('div[class="collapse__wrapper_inner"]').find('div[class="icon menu gear_menu"]').first().click({force: true})
        cy.get('div[class="menu_wrapper"]').find('#menu_delete_text').click()
        cy.screenshot();
        cy.get('.reactist_modal_box__actions').contains('Delete').click({force: true})
        cy.wait(1000)
        cy.get('.left_menu').not('Project test')
        cy.screenshot();
    });

    /* Escenario fallido*/

    it('Add project missing name', function() {        
        cy.get('div[id="editor"]').click()
        cy.get('div[id="left_menu"]').find('button[data-track="navigation|projects_quick_add"]').click({force: true})
        cy.get('form').find('button[aria-disabled="true"]')
        cy.screenshot();      
    });
})

function asLogin() {
    it('Visits TodoIst and login succesfully', function() {
        cy.visit('https://todoist.com/');
        cy.visit('https://todoist.com/users/showlogin')      
        cy.get('#login_form').find('input[id="email"]').click().type("test_exitosa1@example.com")
        cy.get('#login_form').find('input[id="password"]').click().type("12345678") 
        cy.get('.submit_btn').click()
    })
}