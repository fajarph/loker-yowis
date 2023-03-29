const { Router } = require('express');
const controllers = require('../controllers/level.js');
const router = Router()

router.get('/level', controllers.getLevels)
router.post('/level', controllers.createLevel)

module.exports = router