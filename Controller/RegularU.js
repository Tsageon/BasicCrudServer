exports.updateOwnProfile = async (req, res) => {
  const uid = req.user.uid; 
  const updates = req.body;

  if (!Object.keys(updates).length) {
    return res.status(400).json({ error: "No data provided for update" });
  }

  try {
    await db.collection("Employees").doc(uid).update(updates);
    res.status(200).json({ success: true, message: "Profile updated", id: uid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Coming Soon