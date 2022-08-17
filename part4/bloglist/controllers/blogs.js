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

module.exports = blogsRouter
