const { Router } = require('express');
const controllers = require('../controllers/job.js');
const middleware = require('../middleware/authUser.js')
const validation = require('../validation/job/job.validation.js')
const router = Router()

router.get('/jobs',middleware.verifyUser, controllers.getJobs)
router.get('/jobs/:id',middleware.verifyUser, controllers.getJobById)
router.post('/jobs', validation.createJob, middleware.verifyUser, controllers.createJob)
router.patch('/jobs/:id', validation.createJob, middleware.verifyUser, middleware.adminOnly, controllers.updateJob)
router.delete('/jobs/:id', middleware.verifyUser, middleware.adminOnly, controllers.deleteJob)
router.get('/jobsbyroleid', controllers.getJobsByRoleId)
router.get('/userjobs', controllers.getSaveUserJobIds)
router.post('/userjobs', controllers.createUserJob)
router.post('/deleteuserjobs', controllers.deleteUserJob)


module.exports = router