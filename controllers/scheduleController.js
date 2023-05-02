const Schedule = require("../models/scheduleModel");
const User = require("../models/userModel");
const Staff = require("../models/staffModel");

exports.getSchedule = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const day = req.query.day;

    if (!day) {
      return res.status(400).json({ error: 'Day parameter is missing' });
    }

    const schedule = await Schedule.find({
      batch: user.batch,
      degree: user.degree,
      day: day, // Filter based on the provided day
    });

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addSchedule = async (req, res) => {
    try {
      const { day, startTime, endTime,moduleName, batch, degree, staffId } = req.body;
      const newSchedule = new Schedule({ day, startTime,endTime, moduleName, batch, degree, staffId});
      await newSchedule.save();
      res.status(201).json(newSchedule);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Staff

  exports.getStaffSchedule = async (req, res) => {
    try {
      const staff = await Staff.findById(req.staff._id);
  
      if (!staff) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const day = req.query.day;
  
      if (!day) {
        return res.status(400).json({ error: 'Day parameter is missing' });
      }
  
      const schedule = await Schedule.find({
        staffId: staff.staffId,
        day: day, // Filter based on the provided day
      });
  
      res.json(schedule);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };