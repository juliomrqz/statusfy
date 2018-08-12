const { Router } = require('express')

const incidents = require('./incidents')
const systems = require('./systems')

const router = Router()

// Add Routes
router.use(incidents)
router.use(systems)

module.exports = router
