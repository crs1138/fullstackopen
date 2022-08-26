describe('Note app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            username: 'root',
            name: 'Super User',
            password: 'Sekret',
        }
        cy.request('POST', 'http://localhost:3001/api/users', user)

        // cy.request('POST', 'http://localhost:3001/api/login', {
        //     username: 'root',
        //     password: 'Sekret',
        // }).then((response) => {
        //     const { token } = response.body

        // })
        cy.login({ username: 'root', password: 'Sekret' })
        const notes = [
            {
                content: 'This is the test note',
                important: true,
            },
            {
                content: 'This is the second test note',
                important: false,
            },
        ]

        notes.forEach((note) => {
            cy.createNote(note)
            // const createNoteOptions = {
            //     body: note,
            //     method: 'POST',
            //     url: 'http://localhost:3001/api/notes',
            //     auth: {
            //         bearer: token,
            //     },
            // }

            // cy.request(createNoteOptions)
        })
        cy.clearLocalStorage()
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function () {
        cy.contains('Notes')
        cy.contains(
            'Note app, Department of Computer Science, University of Helsinki 2022'
        )
    })

    // failing test example
    it('front page should NOT contain random text', function () {
        cy.contains('wtf is this app?').should('not.exist')
    })

    it('login form can be opened', function () {
        cy.contains(/login/i).click()
    })

    it('user can log in', function () {
        cy.contains(/login/i).click()
        cy.contains(/username/i)
            .find('input')
            .type('root')
        cy.contains(/password/i)
            .find('input')
            .type('Sekret')
        cy.get('button[type="submit"]').click()
    })

    describe('when logged in', function () {
        beforeEach(function () {
            // The first solution
            //
            // cy.get('[data-cy="login"]').click()
            // cy.contains(/username/i)
            //     .find('input')
            //     .type('root')
            // cy.contains(/password/i)
            //     .find('input')
            //     .type('Sekret')
            // cy.get('button[type="submit"]').click()

            // The second solution: faster, more reliable and recommended by
            // Cypress
            //
            // cy.request('POST', 'http://localhost:3001/api/login', {
            //     username: 'root',
            //     password: 'Sekret',
            // }).then((response) => {
            //     localStorage.setItem(
            //         'loggedNoteAppUser',
            //         JSON.stringify(response.body)
            //     )
            //     cy.visit('http://localhost:3000')
            // })

            // The third solution: abstracting the 2nd solution into our custom
            // command defined in `/cypress/support/commands.js`
            //
            cy.login({ username: 'root', password: 'Sekret' })
            cy.visit('http://localhost:3000')
        })

        it('a new note can be created', function () {
            cy.contains('New note').click()
            cy.get('[data-cy="new-note-input"]').type(
                'A new note created by Cypress'
            )
            cy.get('[data-cy="submit"]').click()
            cy.contains('A new note created by Cypress')
        })

        it('can be made important', function () {
            cy.contains('This is the second test note')
                .contains('make important')
                .click()

            cy.contains('This is the second test note').contains(
                'make not important'
            )
        })
    })

    it('login fails with wrong password', function () {
        cy.contains('Login').click()
        cy.contains(/username/i)
            .find('input')
            .type('root')
        cy.contains(/password/i)
            .find('input')
            .type('root')
        cy.get('button[type="submit"]').click()

        cy.get('.error')
            .should('contain', 'Wrong credentials')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')

        cy.get('html').should('not.contain', 'Super User logged in')
    })
})
