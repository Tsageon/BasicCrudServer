const paystack = require('../Config/Paystack');

exports.initializePayment = async (req, res) => {
  try {
    const { email, amount } = req.body;
    if (!email || !amount) return res.status(400).json({ error: 'Email and amount are required' });

    const response = await paystack.post('/transaction/initialize', {
      email,
      amount: Math.round(amount * 100), 
      currency: 'ZAR', 
    });

    return res.status(200).json(response.data);
  } catch (err) {
    console.error('Paystack Init Error:', err.response?.data || err.message);
    return res.status(500).json({ error: 'Payment initialization failed' });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params;
    if (!reference) return res.status(400).json({ error: 'Payment reference required' });

    const response = await paystack.get(`/transaction/verify/${reference}`);
    return res.status(200).json(response.data);
  } catch (err) {
    console.error('Paystack Verify Error:', err.response?.data || err.message);
    return res.status(500).json({ error: 'Payment verification failed' });
  }
};
