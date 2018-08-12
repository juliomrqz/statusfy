const { Router } = require('express')

const incidents = require('./incidents')

const router = Router()

// Add Incidents Routes
router.use(incidents)

module.exports = router
