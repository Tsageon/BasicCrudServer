const express = require("express");
const router = express.Router();
const userController = require("../Controller/User");
const {sendPasswordResetEmail} = require('../Controller/User');
const { verifyToken, checkRole } = require("../Middleware/authMiddleware");

router.get("/get", verifyToken, userController.getUsers);
router.post("/add", verifyToken, checkRole(["admin", "superadmin"]), userController.addUser);
router.post('/reset-password', verifyToken, checkRole(['admin', 'superadmin']), sendPasswordResetEmail);
router.put("/update/:id", verifyToken, checkRole(["admin", "superadmin"]), userController.updateUser);
router.delete("/delete/:id", verifyToken, checkRole(["admin", "superadmin"]), userController.deleteUser);

module.exports = router;