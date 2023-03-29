const { Router } = require('express');
const controllers = require('../controllers/level.js');
const router = Router()

router.get('/levels', controllers.getLevels)
router.post('/levels', controllers.createLevel)

module.exports = router