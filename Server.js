require('dotenv').config();
console.log('✅ .env loaded');
const express = require('express');
const cors = require('cors');
const paystackRoutes = require('./Routes/PaystackRoute');
const employeeRoutes = require("./Routes/EmployeeR");
const userRoutes = require("./Routes/UserR");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/employees", employeeRoutes);
app.use('/api/pay', paystackRoutes);
app.use("/api/users", userRoutes);

const PORT = 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});