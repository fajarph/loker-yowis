const { Router } = require('express');
const controllers = require('../controllers/job.js');
const middleware = require('../middleware/authUser.js')
const router = Router()

router.get('/jobs',  controllers.getJobs)
router.get('/jobs/:id',  controllers.getJobById)
router.post('/jobs',  middleware.adminOnly, controllers.createJob)
router.patch('/jobs/:id',  middleware.adminOnly, controllers.updateJob)
router.delete('/jobs/:id',  controllers.deleteJob)


module.exports = router