const { Router } = require('express');
const controllers = require('../controllers/role.js');
const router = Router()

router.get('/role', controllers.getRoles)
router.post('/role', controllers.createRole)

module.exports = router