const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  studentId: {
    type: String,
    ref: "User",
  },
  subject: String,
  marks: Number,
  courseworkScore: Number,
  presentationScore: Number,
  finalGrade: String,
  staffId:String,
});

module.exports = mongoose.model("Marks", marksSchema);
