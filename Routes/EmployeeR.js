const express = require('express');
const router = express.Router();
const {
  createEmployeeProfile,
  listEmployees,
  updateEmployeeRole,
  deleteEmployee
} = require('../Controller/Employee');
const {sendPasswordResetEmail} = require('../Controller/Employee');
const { verifySuperAdmin } = require('../Middleware/authMiddleware');

router.post('/create', verifySuperAdmin, createEmployeeProfile);
router.get('/list', verifySuperAdmin, listEmployees);
router.put('/update-role', verifySuperAdmin, updateEmployeeRole);
router.delete('/delete/:uid', verifySuperAdmin, deleteEmployee);
router.post('/reset-password', verifySuperAdmin, sendPasswordResetEmail);

module.exports = router;
