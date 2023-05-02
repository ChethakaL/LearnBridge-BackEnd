const express = require("express");
const router = express.Router();
const schedulesController = require("../controllers/scheduleController");
const { protect } = require('../middleware/authMiddleware');
const { staffProtect } = require('../middleware/staffAuthMiddleware');



router.post("/", schedulesController.addSchedule);
router.get("/userschedule", protect,schedulesController.getSchedule);
router.get("/staffschedule", staffProtect,schedulesController.getStaffSchedule);


module.exports = router;
