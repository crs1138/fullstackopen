const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

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

const generateDefaultUser = async () => {
    const passwordHash = await bcrypt.hash('Sekret', 10)
    const user = new User({
        username: 'root',
        name: 'Super User',
        passwordHash,
    })
    await user.save()
    return user
}

module.exports = {
    initialBlogs,
    getValidNonExistingId,
    getUsersInDb,
    generateDefaultUser,
}
