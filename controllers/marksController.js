const Marks = require("../models/marksModel");
const User = require("../models/userModel"); // Add this line
const Staff = require("../models/staffModel");

exports.getMarks = async (req, res) => {
    try {
      const studentId = req.user._id; // Use the logged-in user's ObjectId
      const marks = await Marks.find({ studentId });
      res.json(marks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

exports.addMarks = async (req, res) => {
  try {
    const { studentId, subject, marks, presentationScore, courseworkScore, finalGrade, staffId } = req.body;

    // Add the following lines to query the ObjectId based on the studentId
    const user = await User.findOne({ studentId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newMarks = new Marks({ studentId: user._id, subject, marks, presentationScore, courseworkScore, finalGrade, staffId }); // Replace studentId with user._id
    await newMarks.save();
    res.status(201).json(newMarks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lecturer

exports.getStaffMarks = async (req, res) => {
  try {
    const staffId = req.staff.staffId; // Use the logged-in user's ObjectId
    const marks = await Marks.find({ staffId });
    res.json(marks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};