const express = require('express')
const Profile = require('../models/Profile')
const { verifyUser } = require('../middleware/auth')

const router = express.Router()

router.route('/')
    .get((req, res, next) => {
        Profile.find()
            .populate('user')
            .then(profiles => {
                res.json(profiles)
            }).catch(next)
    })
    .post((req, res, next) => {

        let profile = {
            ...req.body,
            user: req.user.id
        }

        Profile.create(profile)
            .then((profile) => {
                res.json(profile)
            }).catch(next)
    })

router.route('/:profile_id')
    .get((req, res, next) => {
        res.send('get Profile by Id')
    })
    .put((req, res, next) => {
        res.send('Update profile')
    })
    .delete((req, res, next) => {
        res.send('delete this profile')
    })

module.exports = router
