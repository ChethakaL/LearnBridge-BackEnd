const express = require("express");
const router = express.Router();
const marksController = require("../controllers/marksController");
const { protect } = require('../middleware/authMiddleware');
const {staffProtect} = require('../middleware/staffAuthMiddleware');

router.post("/", marksController.addMarks); 
router.get("/studentmarks", protect,marksController.getMarks);
router.get("/staffmarks", staffProtect,marksController.getStaffMarks);

module.exports = router;
