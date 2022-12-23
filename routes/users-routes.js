const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

router.post('/register', (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if (user != null) {
                res.status(400)
                return next(new Error(`Username ${req.body.username} already exists`))
            }
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) next(err)
                let user = new User()
                user.username = req.body.username
                if (req.body.role) user.role = req.body.role
                user.password = hash
                user.save().then(user => {
                    data = {
                        id: user._id,
                        username: user.username,
                        role: user.role
                    }
                    res.status(201).json({ status: 'User registration success.', data })
                }).catch((err) => { res.status(400); next(err) })
            })
        }).catch(next)
})

router.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if (user == null) {
                res.status(401)
                return next(new Error(`User ${req.body.username} has not registered.`))
            }
            bcrypt.compare(req.body.password, user.password, (err, status) => {
                if (err) return next(err)
                if (!status) {
                    res.status(401)
                    return next(new Error('Password does not match!'))
                }
                data = {
                    id: user._id,
                    username: user.username,
                    role: user.role
                }
                const token = jwt.sign(data,
                    process.env.SECRET, { expiresIn: '1h' })
                res.json({ status: 'Login Success', token: token })
            })
        }).catch(next)
})


module.exports = router