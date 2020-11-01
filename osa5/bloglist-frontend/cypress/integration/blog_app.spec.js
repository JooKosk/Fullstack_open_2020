const { default: blogs } = require('../../src/services/blogs')

describe ('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('abina')
      cy.get('#password').type('banaana')
      cy.get('#login-button').click()

      cy.contains('wrong credentials')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salasana' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('a new blog')
      cy.get('#author').type('Martin Jabinskizka')
      cy.get('#url').type('www.myblog.com')
      cy.contains('create').click()

      cy.contains('a new blog')
    })

    describe('and a blog exists', function() {
      beforeEach(function () {
        cy.createBlog({
          title: 'Coolio boolio',
          author: 'Tester man',
          url: 'www.testerman.com',
          likes: 0
        })
      })

      it('blog can be liked', function () {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('blog can be removed by authorised user', function () {
        cy.contains('view').click()
        cy.contains('remove').click()

        cy.reload()
        cy.get('html').should('not.contain', 'a new blog')
      })
    })

    describe('multiple blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Coolio boolio',
          author: 'Tester man',
          url: 'www.testerman.com',
          likes: 0
        })
        cy.createBlog({
          title: 'Testauksen perusteet',
          author: 'Tester man',
          url: 'www.testerman.com/perusteet',
          likes: 5
        })
        cy.createBlog({
          title: 'Testauksen jatkokurssi',
          author: 'Testermans brother',
          url: 'www.testermanbrother.com/jatkokurssi',
          likes: 10
        })
      })

      it.only('blogs are listed according to amount of likes', function () {
        cy.get('.blog').then(blog => {blog.find('button').click() })
        cy.get('.blogAllInfo').eq(0).should('contain', 'likes 10')
        cy.get('.blogAllInfo').eq(1).should('contain', 'likes 5')
        cy.get('.blogAllInfo').eq(2).should('contain', 'likes 0')
      })
    })
  })
})