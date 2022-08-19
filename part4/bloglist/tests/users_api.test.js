const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    await helper.generateDefaultUser()
})

describe('creating user', () => {
    test('succeeds creating a new user successfully', async () => {
        const usersAtStart = await helper.getUsersInDb()

        const result = await api
            .post('/api/users')
            .send({
                username: 'franta',
                name: 'Franta Fuka',
                password: 'Podfuk',
            })
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.getUsersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
        expect(usersAtEnd).toContainEqual(result.body)
    })

    test('fails creating a new user, username must be unique', async () => {
        const usersAtStart = await helper.getUsersInDb()

        const result = await api
            .post('/api/users')
            .send({
                username: 'root',
                name: 'Mega Admin',
                password: '123456',
            })
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username must be unique')
        const usersAtEnd = await helper.getUsersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('fails creating a new user, missing username', async () => {
        const usersAtStart = await helper.getUsersInDb()

        const result = await api
            .post('/api/users')
            .send({
                name: 'Mega Admin',
                password: '123456',
            })
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain(
            'username must have at least 3 chars'
        )
        const usersAtEnd = await helper.getUsersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('fails creating a new user, username must have at least 3 chars', async () => {
        const usersAtStart = await helper.getUsersInDb()

        const result = await api
            .post('/api/users')
            .send({
                username: 'aj',
                name: 'Mega Admin',
                password: '123456',
            })
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain(
            'username must have at least 3 chars'
        )
        const usersAtEnd = await helper.getUsersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('fails creating a new user, missing password', async () => {
        const usersAtStart = await helper.getUsersInDb()

        const result = await api
            .post('/api/users')
            .send({
                username: 'pepa',
                name: 'Mega Admin',
            })
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain(
            'password must have at least 3 chars'
        )
        const usersAtEnd = await helper.getUsersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('fails creating a new user, password must have at least 3 chars', async () => {
        const usersAtStart = await helper.getUsersInDb()

        const result = await api
            .post('/api/users')
            .send({
                username: 'franta',
                name: 'Franta Fuka',
                password: '12',
            })
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain(
            'password must have at least 3 chars'
        )
        const usersAtEnd = await helper.getUsersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
