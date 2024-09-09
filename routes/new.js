const express = require('express');
const router = express.Router();
const controller = require('../controllers/newController');

router.get('/',controller.get);

module.exports= router;