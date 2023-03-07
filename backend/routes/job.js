const { Router } = require('express');
const controllers = require('../controllers/job.js');
const router = Router()

router.get('/jobs', controllers.getJobs)
router.get('/jobs/:id', controllers.getJobById)
router.post('/jobs', controllers.createJob)
router.patch('/jobs/:id', controllers.updateJob)
router.delete('/jobs/:id', controllers.deleteJob)


module.exports = router