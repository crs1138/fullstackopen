const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res, next) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ username })

        const invalidLoginCredentials =
            user === null ||
            !username ||
            !password ||
            !(await bcrypt.compare(password, user.passwordHash))

        if (invalidLoginCredentials) {
            return res
                .status(401)
                .json({ error: 'invalid username or password' })
        }

        const userForToken = {
            username: user.username,
            id: user._id,
        }
        const token = jwt.sign(userForToken, process.env.SECRET)

        res.status(200).json({
            token,
            username: user.username,
            name: user.name,
        })
    } catch (exception) {
        next(exception)
    }
})

module.exports = loginRouter
