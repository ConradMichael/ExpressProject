const express = require('express');
const router = express.Router();
const RegController = require('../controllers/RegController');

router.post('/getreg', RegController.getByReg);
router.post('/create', RegController.createDataSet);
router.delete('/delete', RegController.deleteDataSet);

module.exports = router;