const mongoose = require('mongoose')
const User = require('../models/user')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    await helper.generateDefaultUser()
})

describe('user access successful', () => {
    test('successful login', async () => {
        const usersAtStart = await helper.getUsersInDb()

        const requestPayload = {
            username: 'root',
            password: 'Sekret',
        }

        const result = await api
            .post('/api/login')
            .send(requestPayload)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const matchUser = usersAtStart[0]
        expect(result.body.username).toMatch(matchUser.username)
        expect(result.body).toHaveProperty('token')
    })
})

describe('user access denied', () => {
    test('failed login, wrong password', async () => {
        const requestPayload = {
            username: 'root',
            password: 'wrongPass',
        }

        const result = await api
            .post('/api/login')
            .send(requestPayload)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('invalid username or password')
    })

    test('failed login, non-existing user', async () => {
        const requestPayload = {
            username: 'notRoot',
            password: 'Sekret',
        }

        const result = await api
            .post('/api/login')
            .send(requestPayload)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('invalid username or password')
    })

    test('failed login, missing user', async () => {
        const requestPayload = {
            password: 'Sekret',
        }

        const result = await api
            .post('/api/login')
            .send(requestPayload)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('invalid username or password')
    })

    test('failed login, missing password', async () => {
        const requestPayload = {
            username: 'root',
        }

        const result = await api
            .post('/api/login')
            .send(requestPayload)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('invalid username or password')
    })
})

afterAll(() => {
    mongoose.connection.close()
})
