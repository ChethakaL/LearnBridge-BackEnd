const express = require('express');
const { authStaff, registerStaff, getStaffProfile} = require('../controllers/staffController');
const { staffProtect } = require('../middleware/staffAuthMiddleware');

const router = express.Router();

router.route("/").post(registerStaff);
router.post("/login", authStaff);
router.get("/profile",staffProtect,getStaffProfile)

module.exports = router;