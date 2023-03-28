const { Router } = require('express');
const controllers = require('../controllers/user.js');
const router = Router()

router.get('/locations', controllers.getLocations)
router.post('/locations', controllers.createLocation)
router.get('/users',  controllers.getUsers)
router.get('/users/:id',  controllers.getUserById)
router.post('/users', controllers.createUser)
router.patch('/users/:id',  controllers.updateUser)
router.delete('/users/:id',  controllers.deleteUser)


module.exports = router