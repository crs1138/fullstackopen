const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogDbObjects = helper.blogs.map((blog) => new Blog(blog))
    const blogPromiseArray = blogDbObjects.map((blogDbObject) =>
        blogDbObject.save()
    )
    await Promise.all(blogPromiseArray)
})

test('receive all blogs in the db', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(2)
})

test('existance of unique `id` property for each blog result', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const singleBlog = response.body[0]
    expect(singleBlog.id).toBeDefined()
})

test('create a new blog', async () => {
    const newBlog = {
        author: 'Emma Plunkett',
        title: 'Art of life',
        url: 'https://emmaplunkett.art',
        likes: 200,
    }

    const response = await api.post('/api/blogs').send(newBlog).expect(201)
    const blogsAfter = await api.get('/api/blogs')

    expect(response.body.title).toContain('Art of life')
    expect(response.body).toMatchObject(newBlog)
    expect(blogsAfter.body.length).toBe(helper.blogs.length + 1)
})

test('when likes are not specified their default value is 0', async () => {
    const newBlog = {
        author: 'Emma Plunkett',
        title: 'Art of life',
        url: 'https://emmaplunkett.art',
    }

    const response = await api.post('/api/blogs').send(newBlog).expect(201)
    expect(response.body.likes).toBe(0)
})

test('response is 400 for POST request with title or url missing in the payload', async () => {
    const newBlog = {
        author: 'Emma Plunkett',
        likes: 300,
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})
