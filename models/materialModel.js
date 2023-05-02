const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  title: String,
  batch: String,
  degree: String,
  moduleName: String,
  category:String,
  filePath: String,
});

module.exports = mongoose.model("Material", materialSchema);
