describe('Todoist Tasks', function() {
    
    asLogin();
    
    /* Escenarios exitosos*/

    it('Move a task to an existing project', function() { 
        cy.get('.task_item_details').get('div[class="icon menu gear_menu"]').last().click({force: true})
        cy.get('td[data-track="task|more_move_to_project"]').contains('Move to project').click()
        cy.screenshot();
        cy.get('.project_picker_item_name').contains('Project test').click()
        cy.get('#left_menu').contains('Project test').click()
        cy.get('.task_item_content_text').contains('Task test');
        cy.screenshot();
    });

    it('Task checked as Done', function() {         
        cy.get('.list_editor').find('.ist_checkbox').click()
        cy.screenshot();
        cy.get('.list_editor').not('Task test')
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

    it('Add project', function() { 
        cy.wait(2000)       
        cy.get('div[id="left_menu"]').find('button[data-track="navigation|projects_quick_add"]').click({force: true})
        cy.get('form').find('input[id="edit_project_modal_field_name"]').click().type("Project test")
        cy.get('form').find('button[class="color_dropdown_toggle form_field_control"]').click()
        cy.get('div[id="dropdown-select-3-popup"]').find('li[id="dropdown-select-3-option-45"]').click()
        cy.get('form').find('.reactist_switch').click()
        cy.get('form').find('button[type="submit"]').click()
    });

    it('Add task without assign it to a project', function() {
        cy.get('#left_menu').contains('Inbox').click()
        cy.get('div[id="top_bar_inner"]').find('span[id="quick_add_task_holder"]').click()
        cy.get('form').find('div[class="DraftEditor-root"]').click().type("Task test every 2 days")
        cy.get('div[class="item_editor_assign"]').find('button[type="button"]').click()  
        cy.get('div[class="scheduler-suggestions"]').find('button[data-track="scheduler|date_shortcut_tomorrow"]').click()
        cy.get('.item_editor_actions').find('button[type="submit"]').click()
    });
}