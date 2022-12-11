const express = require('express')
const categoryController = require('../controllers/category-controller')

const router = express.Router()

router.route('/')
    .get(categoryController.getAllCategories)
    .post(categoryController.createCategory)
    .put((req, res) => res.status(501).json({ 'msg': 'Not implemented' }))
    .delete(categoryController.deleteAllCategories)

router.route('/:category_id')
    .get(categoryController.getCategoryById)
    .post((req, res) => res.status(501).json({ 'msg': 'Not implemented' }))
    .put(categoryController.updateCategoryById)
    .delete(categoryController.deleteCategoryById)

module.exports = router