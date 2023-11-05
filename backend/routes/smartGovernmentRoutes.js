const express = require('express');
const router = express.Router();
const smartGovernmentController = require('../controllers/smartGovernmentController');

// Rute untuk mendapatkan daftar layanan
router.get('/get-services', smartGovernmentController.getServices);

module.exports = router;
