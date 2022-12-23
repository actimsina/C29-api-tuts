const express = require('express')
const categoryController = require('../controllers/category-controller')
const { verifyAdmin } = require('../middleware/auth')

const router = express.Router()

router.route('/')
    .get(categoryController.getAllCategories)
    .post(verifyAdmin, categoryController.createCategory)
    .put((req, res) => res.status(501).json({ 'msg': 'Not implemented' }))
    .delete(verifyAdmin, categoryController.deleteAllCategories)

router.route('/:category_id')
    .get(categoryController.getCategoryById)
    .post((req, res) => res.status(501).json({ 'msg': 'Not implemented' }))
    .put(verifyAdmin, categoryController.updateCategoryById)
    .delete(verifyAdmin, categoryController.deleteCategoryById)

module.exports = router