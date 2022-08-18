const Blog = require('../models/blog')

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

module.exports = { initialBlogs, getValidNonExistingId }
