const express =require('express');
const router = express.Router();
const controller = require('../controllers/indexController');

router.get('/', controller.importData);
router.post('/new',controller.insertData);
router.post('/trainer/:trainerId/delete',controller.deleteData);

module.exports= router;