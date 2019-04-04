const express = require('express');
const router = express.Router();
const VehicleController = require('../controllers/VehicleController');

router.get('/getall', VehicleController.getAllData);
router.post('/getid', VehicleController.getById);
router.post('/getowner', VehicleController.getByOwner);
router.post('/create', VehicleController.createDataSet);
router.delete('/delete', VehicleController.deleteDataSet);

module.exports = router;