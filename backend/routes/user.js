const { Router } = require('express');
const controllers = require('../controllers/user.js');
const middleware = require('../middleware/authUser.js')
const router = Router()

router.get('/users', middleware.verifyUser, controllers.getUsers)
router.get('/users/:id', middleware.verifyUser, controllers.getUserById)
router.post('/users', controllers.createUser)
router.patch('/users/:id', middleware.verifyUser, controllers.updateUser)
router.delete('/users/:id', middleware.verifyUser, controllers.deleteUser)


module.exports = router