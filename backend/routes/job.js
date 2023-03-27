const { Router } = require('express');
const controllers = require('../controllers/job.js');
const middleware = require('../middleware/authUser.js')
const router = Router()

router.get('/jobs', middleware.verifyUser, controllers.getJobs)
router.get('/jobs/:id', middleware.verifyUser, controllers.getJobById)
router.post('/jobs', middleware.verifyUser, middleware.adminOnly, controllers.createJob)
router.patch('/jobs/:id', middleware.verifyUser, middleware.adminOnly, controllers.updateJob)
router.delete('/jobs/:id', middleware.verifyUser, controllers.deleteJob)


module.exports = router