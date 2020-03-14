describe('Todoist Subtasks', function() {
    
    asLogin();
    
    /* Escenarios exitosos*/

    it('Add subtask', function() { 
        cy.wait(3000)
        cy.get('div[id="top_bar_inner"]').find('span[id="quick_add_task_holder"]').click()
        cy.get('form').find('div[class="DraftEditor-root"]').click().type("Task test every 2 days")
        cy.get('div[class="item_editor_assign"]').find('button[type="button"]').click()  
        cy.get('div[class="scheduler-suggestions"]').find('button[data-track="scheduler|date_shortcut_tomorrow"]').click()
        cy.get('form').find('svg[data-svgs-path="sm1/priority_flag.svg"]').click()
        cy.get('.priority_picker_item_name').contains('Priority 2').click()
        cy.get('.item_editor_actions').find('button[type="submit"]').click()
        cy.get('#left_menu').contains('Inbox').click()
        cy.get('.task_item_details').get('div[class="task_info task_content_item"]').click({force: true})
        cy.get('button[class="plus_add_button"]').click()
        cy.get('form').find('div[class="DraftEditor-root"]').click().type("Subtask test")
        cy.get('div[class="item_editor_assign"]').find('button[type="button"]').click()  
        cy.get('div[class="scheduler-suggestions"]').find('button[data-track="scheduler|date_shortcut_tomorrow"]').click()
        cy.screenshot();
        cy.get('.item_editor_actions').find('button[type="submit"]').click()
        cy.get('div[class="task_list_item__content"]').contains('Subtask test')
        cy.screenshot();
        cy.get('button[class="item_detail_close"]').click()
    });

    it('Search subtask success', function() { 
        cy.get('input[class="quick_find fixed_pos"]').click().type("Subtask test", {force: true})
        cy.screenshot();
		cy.wait(1000)
        cy.get('span[class="ist_complete_content"]').contains("Subtask test")
        cy.screenshot();
    });

    it('Edit subtask', function() { 
        cy.get('span[class="ist_complete_content"]').contains("Subtask test").click()
        cy.get('.task_item_content_text').contains('Subtask test').click()
        cy.get('div[class="DraftEditor-editorContainer"]').find('div[contenteditable="true"]').clear()
        cy.get('form').find('div[class="DraftEditor-root"]').click().type("Subtask editing test")
        cy.screenshot();
        cy.get('.item_editor_actions').find('button[type="submit"]').click()
        cy.get('.task_item_content_text').contains('Subtask editing test')
        cy.screenshot();
    });

    it('Delete subtask', function() { 
        cy.get('.task_item_details').get('div[class="icon menu gear_menu"]').last().click({force: true})
        cy.get('td[data-track="task|more_delete"]').contains('Delete task').click()
        cy.screenshot();
        cy.get('.reactist_modal_box__actions').contains('Delete').click({force: true})
        cy.wait(1000)
        cy.get('#editor').not('Subtask test')
        cy.screenshot();
    });


    /* Escenario fallido*/

    it('Search a non existing subtask', function() {
        cy.get('input[class="quick_find fixed_pos"]').clear().type("Other subtask", {force: true})
        cy.screenshot();
		cy.wait(1000)
        cy.get('span[class="ist_complete_content"]').not("Other subtask")
        cy.screenshot();
    });

    it('Add subtask missing name', function() { 
        cy.get('div[id="editor"]').click()
        cy.get('.task_item_details').get('div[class="task_info task_content_item"]').click({force: true})
        cy.get('button[class="plus_add_button"]').click()        
        cy.get('.item_editor').find('button[aria-disabled="true"]')
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