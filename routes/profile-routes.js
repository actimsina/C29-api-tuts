const express = require('express')
const Profile = require('../models/Profile')
const uploadProfile = require('../middleware/upload')

const router = express.Router()

router.route('/')
    .get((req, res, next) => {
        Profile.find()
            .populate('user')
            .then(profiles => {
                res.json(profiles)
            }).catch(next)
    })
    .post(uploadProfile, (req, res, next) => {
        console.log(req.file)
        console.log(req.body)
        if (req.file == undefined) return next(new Error('File is not uploaded.'))
        Profile.create({
            ...req.body,
            user: req.user.id,
            image: req.file.filename
        }).then((profile) => res.status(201).json(profile)).catch(next)
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
