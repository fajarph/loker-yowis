const { Router } = require('express');
const controllers = require('../controllers/location.js');
const router = Router()

router.get('/locations', controllers.getLocations)
router.post('/locations', controllers.createLocation)

module.exports = router