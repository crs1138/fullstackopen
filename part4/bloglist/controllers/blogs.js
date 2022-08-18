const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res, next) => {
    try {
        const blogs = await Blog.find({})
        res.json(blogs)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.get('/:id', async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id)

        res.status(200).json(blog)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.post('/', async (req, res, next) => {
    req.body.likes = req.body.likes || 0

    if (!req.body.author || !req.body.url) {
        res.status(400).json({
            error: 'Missing author and/or url for the blog record',
        })
    }
    try {
        const blog = new Blog(req.body)
        const result = await blog.save()
        res.status(201).json(result)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (req, res, next) => {
    const hasBlogWithId = await Blog.findById(req.params.id)
    if (!hasBlogWithId) {
        return res.status(404).json({ error: 'Blog not found.' })
    }
    try {
        Blog.remove({ id: req.params.id })
        res.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', async (req, res, next) => {
    try {
        const { title, author, url, likes } = req.body
        const result = await Blog.findByIdAndUpdate(
            req.params.id,
            { title, author, url, likes },
            { new: true, runValidators: true, context: 'query' }
        )
        res.json(result)
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter
