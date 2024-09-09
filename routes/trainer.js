const express = require('express');
const router = express.Router();
const controller = require('../controllers/trainerController');

router.get('/:trainerId', controller.importData);

module.exports= router;