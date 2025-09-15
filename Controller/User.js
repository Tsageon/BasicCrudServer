const { db } = require("../Config/Firebase");

exports.getUsers = async (req, res) => {
  try {
    const snapshot = await db.collection("Employees").get();
    const users = snapshot.docs.map(doc => ({ id: doc.id,...doc.data() }));
    res.status(200).json({ success: true, users});
  } catch (err) {
    res.status(500).json({ error: err.message });
}};

exports.addUser = async (req, res) => {
  const { name, email, position, department } = req.body;
  
  if (!name || !email || !position || !department) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const docRef = await db.collection("Employees").add({
      name,
      email,
      position,
      department,
      createdAt: new Date()
    });
    res.status(200).json({ success: true, id: docRef.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
}};

exports.updateUser = async (req, res) => {
  const updates = req.body;

  if (!Object.keys(updates).length) {
    return res.status(400).json({ error: "No data provided for update" });
  }

  try {
    await db.collection("Employees").doc(req.params.id).update(updates);
    res.status(200).json({ success: true, id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
}};

exports.deleteUser = async (req, res) => {
  try {
    await db.collection("Employees").doc(req.params.id).delete();
    res.status(200).json({ success: true, id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
}};

exports.sendPasswordResetEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
const actionCodeSettings = {
  url: 'http://localhost:5000/api/users/reset-password', 
  handleCodeInApp: true,  
};

  try {
    const resetLink = await admin.auth().generatePasswordResetLink(email, actionCodeSettings);
 
    res.json({ message: 'Password reset link generated', resetLink });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};