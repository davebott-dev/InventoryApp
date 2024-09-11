const express = require('express');
const router = express.Router();
const controller = require('../controllers/addController');

router.get('/:trainerId/add',controller.importData);

module.exports = router;