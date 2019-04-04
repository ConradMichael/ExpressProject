const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/getall', dataController.getAllData);
router.post('/getid', dataController.getById);
router.post('/create', dataController.createDataSet);
router.delete('/delete', dataController.deleteDataSet);

module.exports = router;