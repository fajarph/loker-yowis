const { Router } = require('express');
const controllers = require('../controllers/education.js');
const router = Router()

router.get('/educations', controllers.getEducations)
router.post('/educations', controllers.createEducation)

module.exports = router