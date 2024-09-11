const express = require('express');
const router = express.Router();
const controller = require('../controllers/trainerController');

router.get('/:trainerId', controller.importData);
router.post('/:trainerId/add',controller.insertData);

module.exports= router;