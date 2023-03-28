const { Router } = require('express');
const controllers = require('../controllers/category.js');
const router = Router()

router.get('/categories', controllers.getCategories)
router.post('/categories', controllers.createCategory)

module.exports = router