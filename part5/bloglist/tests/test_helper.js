const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const initialBlogs = [
    {
        title: 'crs1138',
        author: 'Jan Pozivil',
        url: 'https://crs1138.me',
        likes: 100,
    },
    {
        title: 'You do not know JS',
        author: 'Kyle Simpson',
        url: 'https://github.com/getify/You-Dont-Know-JS',
        likes: 3000,
    },
]

const getValidNonExistingId = async () => {
    const fakeBlog = new Blog({
        title: 'Delete this soon',
        author: 'John Doe',
        url: 'http://localhost',
        likes: 1,
    })

    await fakeBlog.save()
    await fakeBlog.remove()

    return fakeBlog._id.toString()
}

const getUsersInDb = async () => {
    const users = await User.find({})
    return users.map((user) => user.toJSON())
}

const generateUser = async ({ username, name, password }) => {
    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({
        username,
        name,
        passwordHash,
    })
    await user.save()
    return user
}

const generateDefaultUser = () =>
    generateUser({
        username: 'root',
        name: 'Super User',
        password: 'Sekret',
    })

const getAuthToken = async (
    userCredentials = { username: 'root', password: 'Sekret' }
) => {
    const userLoggedIn = await api
        .post('/api/login')
        .send(userCredentials)
        .expect(200)
    return userLoggedIn.body.token
}

module.exports = {
    initialBlogs,
    getValidNonExistingId,
    getUsersInDb,
    generateUser,
    generateDefaultUser,
    getAuthToken,
}
