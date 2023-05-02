const express = require("express");
const router = express.Router();
const materialsController = require("../controllers/materialController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("file"), materialsController.uploadMaterial);
router.get("/getmaterials", materialsController.getMaterials);
router.get("/download/:id", materialsController.downloadMaterial);
router.get("/filtered", materialsController.getFilteredMaterials);

module.exports = router;
