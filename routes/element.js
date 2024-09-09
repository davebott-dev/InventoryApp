const express = require('express');
const router = express.Router();
const controller = require('../controllers/elementController');


router.get('/:category/:categoryId',controller.importData);

module.exports = router;