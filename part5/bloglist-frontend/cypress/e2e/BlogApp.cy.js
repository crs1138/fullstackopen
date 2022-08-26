describe('Bloglist App', () => {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.createUser({
            username: 'root',
            name: 'Super User',
            password: 'Sekret',
        })
        cy.login({ username: 'root', password: 'Sekret' }).then(() => {
            cy.createBlog({
                title: 'The first blog item',
                author: 'Cypress',
                url: 'http://localhost',
            })
        })
        cy.clearLocalStorage()
        cy.visit('http://localhost:3000')
    })
    it('user can log in', function () {
        // cy.visit('http://localhost:3000')
        cy.contains(/username/i)
            .find('input')
            .type('root')
        cy.contains(/password/i)
            .find('input')
            .type('Sekret')
        cy.get('button').should('contain', 'Login').click()
        cy.contains('Super User logged in')
    })

    it('login fails with wrong username', function () {
        cy.contains(/username/i)
            .find('input')
            .type('wrong-user')
        cy.contains(/password/i)
            .find('input')
            .type('Sekret')
        cy.get('button').should('contain', 'Login').click()
        cy.contains('wrong username or password')
    })

    it('login fails with wrong password', function () {
        cy.contains(/username/i)
            .find('input')
            .type('root')
        cy.contains(/password/i)
            .find('input')
            .type('root')
        cy.get('button').should('contain', 'Login').click()
        cy.contains('wrong username or password').should(
            'has.css',
            'color',
            'rgb(160, 0, 16)'
        )
    })

    describe('user logged in', function () {
        beforeEach(function () {
            cy.login({
                username: 'root',
                password: 'Sekret',
            })
            cy.visit('http://localhost:3000')
        })

        it('user can create a new blog item', function () {
            cy.contains(/add blog/i).click()
            cy.contains('Title')
                .parent()
                .find('input')
                .type(
                    'Cypress pretended to be a user and created this blog item'
                )
            cy.contains(/author/i)
                .parent()
                .find('input')
                .type('Cypress')
            cy.contains(/url/i).parent().find('input').type('http://localhost')
            cy.contains(/create/i).click()
            cy.wait(5000).contains(
                'Cypress pretended to be a user and created this blog item'
            )
        })

        it('user can like a blog item', function () {
            cy.get('[data-cy="blog"]').within(function ($blog) {
                cy.contains(/view/i).click()

                cy.get('[data-cy="like-button"]').as('likeButton')
                cy.get('[data-cy="likes-count"]').as('likesCount')

                let likesBefore
                cy.get('@likesCount').then((likesCountEl) => {
                    likesBefore = likesCountEl[0].innerText
                })

                cy.get('@likeButton').click().wait(1000) // 1000ms wait, just because why not dear-Cypress

                cy.get('@likesCount').then((likesCountEl) => {
                    console.log('likesBefore :', likesBefore)

                    const likesAfter = likesCountEl[0].innerText
                    console.log('likesAfter :', likesAfter)
                    assert.equal(
                        Number(likesAfter),
                        Number(likesBefore) + 1,
                        'Like added'
                    )
                })
            })
        })

        describe('delete a blog item', function () {
            it('user can delete their own blog', function () {
                cy.get('[data-cy="blog"]').within(function () {
                    cy.contains(/view/i).click()
                    cy.contains(/remove/i).click()
                })
                cy.get('[data-cy="blog"]').should('not.exist')
            })

            it('user should not be able to delete blog by another user', function () {
                //scenario setup
                cy.logout()
                cy.createUser({
                    username: 'franta',
                    name: 'Franta Vocasek',
                    password: 'franta',
                })
                cy.login({ username: 'franta', password: 'franta' }).wait(1000)
                cy.visit('http://localhost:3000')

                cy.get('[data-cy="blog"]').within(function () {
                    cy.contains(/view/i).click()
                })
                cy.contains(/remove/i).should('not.exist')
            })
        })

        describe('multiple blog items in the db', function () {
            it('blog items should be ordered by number of likes', function () {
                // scenario setup
                cy.createBlog({
                    title: 'The title with the second most likes',
                    author: 'The Minions',
                    url: 'http://localhost',
                    likes: 5,
                }).as('numberTwo')
                cy.createBlog({
                    title: 'The title with the most likes',
                    author: 'The Dream Team',
                    url: 'http://localhost',
                    likes: 10,
                }).as('numberOne')
                cy.visit('http://localhost:3000').wait(500)

                cy.get('.blog')
                    .eq(0)
                    .should('contain', 'The title with the most likes')
                cy.get('.blog')
                    .eq(1)
                    .should('contain', 'The title with the second most likes')
                cy.get('.blog').eq(2).should('contain', 'The first blog item')
            })
        })
    })
})
