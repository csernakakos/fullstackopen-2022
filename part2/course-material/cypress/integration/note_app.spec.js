describe('Note app', function() {

    beforeEach(function() {

        // cy.visit opens the web address given to it as a parameter in the browser used by the test.
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function() {
        // cy.contains searches for the string it received as a parameter from the page. 
      cy.contains('Notes')
      cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
    })


  it('front page contains random text', function() {    
      cy.contains('wtf is this app?')  });


    // LOGIN FORM:
      it('login form can be opened', function() {
          // The test first searches for the login button by its text, and clicks the button with the command cy.click.
        cy.contains('login').click()
      })


      it('user can login', function () {
        //The login field contains two input fields, which the test should write into.

        // The cy.get command allows for searching elements by CSS selectors.

        // We can access the first and the last input field on the page, and write to them with the command cy.type like so: 
        cy.contains('login').click()
        cy.get('#usernameINPUT').type('mluukkai')
        cy.get('#passwordINPUT').type('salainen')

        // Click the submit button:
        cy.get('#loginBUTTON').click()

        // The last row ensures that the login was successful. 
        cy.contains("Matti L logged in")
      })  



      // Next, let's test adding new notes:

      // The test has been defined in its own describe block. Only logged-in users can create new notes, so we added logging in to the application to a beforeEach block. 
      describe("when logged in", function() {
        beforeEach(function(){
          cy.contains("login").click()
          cy.get('#usernameINPUT').type('mluukkai')
          cy.get('#passwordINPUT').type('salainen')
          cy.get('#loginBUTTON').click()
        })

        it("a new note can be ctrated", function(){
          cy.contains("new note").click();
          cy.get("input").type("a note created by cypress");
          cy.contains("save").click();
          cy.contans("a note created by cypress");
        })
      })

      // Cypress runs the tests in the order they are in the code. So first it runs user can log in, where the user logs in. Then cypress will run a new note can be created for which a beforeEach block logs in as well. Why do this? Isn't the user logged in after the first test? No, because each test starts from zero as far as the browser is concerned. All changes to the browser's state are reversed after each test.
  })

