const bcrypt = require('bcrypt')
const User = require('../models/user')
const usersRouter = require('express').Router()

usersRouter.get('/', async (req, res, next) => {
    try {
        const users = await User.find({}).populate('blogs', {
            url: 1,
            title: 1,
            author: 1,
            id: 1,
        })

        res.json(users)
    } catch (exception) {
        next(exception)
    }
})

usersRouter.post('/', async (req, res, next) => {
    const { username, name, password } = req.body

    const userNotUnique = await User.findOne({ username })
    if (userNotUnique) {
        res.status(400).json({ error: 'username must be unique' })
    }

    const isInvalidUsername = !username || username.length < 3

    if (isInvalidUsername) {
        res.status(400).json({
            error: 'username must have at least 3 chars',
        })
    }

    const isInvalidPassword = !password || password.length < 3

    if (isInvalidPassword) {
        res.status(400).json({
            error: 'password must have at least 3 chars',
        })
    }

    try {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = await new User({
            username,
            name,
            passwordHash,
        })

        await user.save()

        res.status(201).json(user)
    } catch (exception) {
        next(exception)
    }
})

module.exports = usersRouter
