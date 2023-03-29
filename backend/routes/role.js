const { Router } = require('express');
const controllers = require('../controllers/role.js');
const router = Router()

router.get('/roles', controllers.getRoles)
router.post('/roles', controllers.createRole)

module.exports = router