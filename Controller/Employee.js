const { admin, db } = require('../Config/Firebase'); 

exports.createEmployeeProfile = async (req, res) => {
  const { email, password, name, position, department, role = 'user' } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password, and name are required' });
  }

  try {
    const employeeRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    await admin.auth().setCustomUserClaims(employeeRecord.uid, { role });

    await db.collection('Employees').doc(employeeRecord.uid).set({
      name,
      email,
      position,
      department,
      role,
      createdAt: new Date(),
      uid: employeeRecord.uid,
    });

    res.status(201).json({ uid: employeeRecord.uid, email: employeeRecord.email, role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listEmployees = async (req, res) => {
  try {
    const listEmployeesResult = await admin.auth().listUsers(1000);
    const employees = listEmployeesResult.users.map(employee => ({
      uid: employee.uid,
      email: employee.email,
      displayName: employee.displayName,
      role: employee.customClaims?.role || 'user',
    }));
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEmployeeRole = async (req, res) => {
  const { uid, role } = req.body;

  if (!uid || !role) {
    return res.status(400).json({ error: 'UID and role are required' });
  }

  try {
    await admin.auth().setCustomUserClaims(uid, { role });

    await db.collection('Employees').doc(uid).update({ role });

    res.json({ message: `Role for employee ${uid} updated to ${role}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { uid } = req.params;

  if (!uid) {
    return res.status(400).json({ error: 'UID required' });
  }

  try {
    await admin.auth().deleteUser(uid);  
    await db.collection('Employees').doc(uid).delete();

    res.json({ message: `Employee ${uid} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendPasswordResetEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
const actionCodeSettings = {
  url: 'http://localhost:5000/api/employees/reset-password', 
  handleCodeInApp: true,  
};

  try {
    const resetLink = await admin.auth().generatePasswordResetLink(email, actionCodeSettings);
 
    res.json({ message: 'Password reset link generated', resetLink });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};