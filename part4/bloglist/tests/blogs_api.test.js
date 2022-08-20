const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('viewing of existing blogs', () => {
    test('blogs are received as JSON', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.length).toBe(2)
    })

    test('make sure individual blog has unique `id` property', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const singleBlog = response.body[0]
        expect(singleBlog.id).toBeDefined()
    })

    test('view individual blog item', async () => {
        const allBlogsResponse = await api.get('/api/blogs')
        const blogsAtStart = allBlogsResponse.body
        const { id } = blogsAtStart[0]
        const { body: result } = await api.get(`/api/blogs/${id}`).expect(200)
        expect(result).toEqual(blogsAtStart[0])
    })

    test('fails when trying to view individual blog item with invalid id', async () => {
        const { body: result } = await api
            .get('/api/blogs/invalidId')
            .expect(400)
        expect(result).toEqual({ error: 'Malformated id' })
    })
})

describe('creating an individual blog items', () => {
    test('create a new blog', async () => {
        const token = await helper.getAuthToken()

        const newBlog = {
            author: 'Emma Plunkett',
            title: 'Art of life',
            url: 'https://emmaplunkett.art',
            likes: 200,
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
        const blogsAfter = await api.get('/api/blogs')

        expect(response.body.title).toContain('Art of life')
        expect(response.body).toMatchObject(newBlog)
        expect(blogsAfter.body.length).toBe(helper.initialBlogs.length + 1)
    })

    test('when creating a blog item with likes omitted make sure the default value is 0', async () => {
        const token = await helper.getAuthToken()
        const newBlog = {
            author: 'Emma Plunkett',
            title: 'Art of life',
            url: 'https://emmaplunkett.art',
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
        expect(response.body.likes).toBe(0)
    })

    test('response is 400 for POST request if title or url missing when creating a blog item', async () => {
        const token = await helper.getAuthToken()

        const newBlog = {
            author: 'Emma Plunkett',
            likes: 300,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)
    })

    test('fail to create a new blog item - missing or invalid token', async () => {
        const newBlog = {
            author: 'Emma Plunkett',
            title: 'Art of life',
            url: 'https://emmaplunkett.art',
            likes: 200,
        }

        const response = await api.post('/api/blogs').send(newBlog).expect(401)
        const blogsAfter = await api.get('/api/blogs')

        expect(response.body.error).toContain('missing or invalid token')
        expect(blogsAfter.body.length).toBe(helper.initialBlogs.length)
    })
})

describe('deleting an individual blog item', () => {
    test('succeeds deleting a blog item when valid id is provided', async () => {
        const token = await helper.getAuthToken()

        const dummyBlogItem = {
            author: 'Emma Plunkett',
            title: 'I will delete this blog soon',
            likes: 1,
            url: 'https://emmaplunkett.art',
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(dummyBlogItem)
        const { id: idToDelete } = response.body

        await api.delete(`/api/blogs/${idToDelete}`).expect(204)
    })

    test('fail deleting a blog item with valid non-existing id', async () => {
        const validNonexistingId = await helper.getValidNonExistingId()
        await api.delete(`/api/blogs/${validNonexistingId}`).expect(404)
    })
})

describe('updating blog item', () => {
    test('succeeds to update blog item when valid, existing `id` is given', async () => {
        const { body: blogsAtStart } = await api.get('/api/blogs')
        const { id } = blogsAtStart[0]
        const editedBlog = { ...blogsAtStart[0], likes: 123 }
        const { body: result } = await api
            .put(`/api/blogs/${id}`)
            .send(editedBlog)
            .expect(200)
        expect(result).toEqual(editedBlog)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
