const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res, next) => {
    try {
        // populate('name-of-the-field-with-reference-as-defined-in-blogSchema')
        const blogs = await Blog.find({}).populate('user', {
            username: 1,
            name: 1,
            id: 1,
        })
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
    const { author, title, likes, url } = req.body

    if (!author || !url) {
        res.status(400).json({
            error: 'Missing author and/or url for the blog record',
        })
    }
    try {
        const user = await User.findOne()

        const newBlog = {
            author,
            title,
            likes,
            url,
            user: user._id,
        }
        const blog = new Blog(newBlog)
        const savedBlog = await blog.save()

        // save the reference of the blog Id to the user too
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        res.status(201).json(savedBlog)
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
