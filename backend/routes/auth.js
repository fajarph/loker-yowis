const { Router } = require('express');
const controllers = require('../controllers/auth.js');
const router = Router()

router.get('/me', controllers.Me)
router.post('/login', controllers.Login)
router.delete('/logout', controllers.LogOut)

module.exports = router