const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  day: String,
  startTime: String,
  endTime: String,
  moduleName: String,
  batch: String,
  degree: String,
  staffId: String
});

module.exports = mongoose.model("Schedule", scheduleSchema);
