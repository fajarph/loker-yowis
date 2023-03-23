const { Router } = require('express');
const controllers = require('../controllers/job.js');
const middleware = require('../middleware/authUser.js')
const router = Router()

router.get('/jobs', middleware.verifyUser, controllers.getJobs)
router.get('/jobs/:id', middleware.verifyUser, controllers.getJobById)
router.post('/jobs', middleware.verifyUser, controllers.createJob)
router.patch('/jobs/:id', middleware.verifyUser, controllers.updateJob)
router.delete('/jobs/:id', middleware.verifyUser, controllers.deleteJob)


module.exports = router