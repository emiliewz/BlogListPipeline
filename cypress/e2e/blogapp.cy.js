describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.createUser({ name: 'Emilie', username: 'user1', password: 'user1pwd' })
    cy.createUser({ name: 'Wencheng', username: 'user2', password: 'user2pwd' })
  })

  it('Login form is shown', function () {
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('user1')
      cy.get('#password').type('user1pwd')
      cy.get('#login-button').click()

      cy.contains('Welcome')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('user1')
      cy.get('#password').type('user1')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
      cy.get('html').should('not.contain', 'Welcome')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'user1', password: 'user1pwd' })
    })

    it('A blog can be created', function () {
      cy.contains('create new').click()
      cy.get('#blog-title').type('this is a new blog')
      cy.get('#blog-author').type('Emilie Zhang')
      cy.get('#blog-url').type('localhost:5173')
      cy.contains('create').click()

      cy.get('html').should('contain', 'this is a new blog')
      cy.contains('Emilie Zhang')
    })

    describe('When a blog has been created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'this is another blog',
          author: 'cypress',
          url: 'localhost:5173',
        })
      })

      it('a blog can be liked', function () {
        cy.contains('this is another blog').click()
        cy.contains('like').click()

        cy.contains('1 likes')
      })

      it('the creator can delete it', function () {
        cy.contains('this is another blog').click()
        cy.contains('delete').click()

        cy.contains('removed')
        cy.get('html').should('not.contain', 'this is another blog')
      })

      it('a non creator can not delete a blog', function () {
        cy.contains('logout').click()
        cy.login({ username: 'user2', password: 'user2pwd' })
        cy.contains('this is another blog').click()
        cy.contains('delete').should('not.exist')
      })
    })

    describe('and several blogs exists', function () {
      const blogs = [
        { title: 'new Blog A', author: 'cypress', url: 'localhost:5173' },
        { title: 'new Blog B', author: 'cypress', url: 'localhost:5173' },
        { title: 'new Blog C', author: 'cypress', url: 'localhost:5173' }
      ]
      beforeEach(function () {
        cy.createBlog(blogs[0])
        cy.createBlog(blogs[1])
        cy.createBlog(blogs[2])
      })

      it('blogs are ordered according to likes', () => {
        cy.contains(blogs[0].title).click()
        cy.get('.like').click()
        cy.wait(500)
        cy.get('.like').click()
        cy.wait(500)
        cy.get('.like').click()
        cy.wait(500)

        cy.contains('blogs').click()
        cy.contains(blogs[1].title).as(
          'secondMostLikes'
        ).click()
        cy.get('.like').click()

        cy.contains('blogs').click()
        cy.get('.blog').eq(0).should('contain', blogs[0].title)
        cy.get('.blog').eq(1).should('contain', blogs[1].title)
        cy.get('.blog').eq(2).should('contain', blogs[2].title)
      })
    })
  })
})
