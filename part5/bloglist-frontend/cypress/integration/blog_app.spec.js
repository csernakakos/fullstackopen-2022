describe('Blog app', function() {

    beforeEach(function() {
        cy.request('POST', 'http://localhost:3005/api/testing/reset')
        const user = {
            username: "TESTBLOG_USER",
            name: "TESTBLOG_USER",
            password: "12345"
        }

        cy.request("POST", "http://localhost:3005/api/users", user);
        cy.visit('http://localhost:3000')
      })
    
      it('Login form is shown', function() {
        cy.contains('#loginFORM');
      })

      describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('#loginFORM').click()
            cy.get('#username').type('TESTBLOG_USER')
            cy.get('#password').type('12345')
            cy.get('#login-button').click()
        
            cy.get(".message").contains('Welcome, dear user!')
        })
    
        it('fails with wrong credentials', function() {
            cy.contains('#loginFORM').click()
            cy.get('#username').type('TESTBLOG_USER')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
        
            cy.get(".message").contains('This user does not exist, or the username or password is wrong.')
        })
      })   

  })

