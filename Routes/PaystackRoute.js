const express = require('express');
const { initializePayment, verifyPayment } = require('../Controller/PaystackController');

const router = express.Router();

router.post('/paystack/initialize', initializePayment);
router.get('/paystack/verify/:reference', verifyPayment);

module.exports = router;