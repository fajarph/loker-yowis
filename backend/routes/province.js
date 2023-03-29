const { Router } = require('express');
const controllers = require('../controllers/province.js');
const router = Router()

router.get('/provinces', controllers.getProvinces)
router.post('/provinces', controllers.createProvince)

module.exports = router