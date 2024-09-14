const express = require('express');
const router = express.Router();
const controller = require('../controllers/trainerController');

router.get('/:trainerId', controller.importData);
router.post('/:trainerId/add',controller.insertData);

router.get('/:trainerId/:category/:categoryId/update', controller.updateDataGet);
router.post('/:trainerId/:category/:categoryId/update', controller.updateDataPost);

router.post('/:trainerId/:category/:categoryId/delete', controller.deleteData);
module.exports= router;