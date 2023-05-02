const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const generateToken = require("../generateToken");
const Staff = require("../models/staffModel");

const registerStaff = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { staffId,username, password, email, phone, address, dob, faculty, role} = req.body;
  
    if (!staffId ||!username || !password || !email || !phone || !address || !dob || !faculty || !role) {
      return res.status(400).json({
        message: "Please enter all the fields",
      });
    }
  
    const staffExists = await Staff.findOne({ username });
  
    if (staffExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
  
    // Remove this line, as you don't need to hash the password manually.
    // const hashedPassword = await bcrypt.hash(password, 10);
  
    const staff = await Staff.create({
      staffId,
      username,
      password,
      name, // Use the plain-text password here, as the pre-save middleware will handle the hashing.
      email,
      phone,
      address,
      dob,
      faculty,
      role,
      nic,
    });
  
    if (staff) {
      res.status(201).json({
        _id: staff._id,
        staffId: staff.staffId,
        username: staff.staffname,
        email: staff.email,
        name: staff.name,
        phone: staff.phone,
        address: staff.address,
        dob: staff.dob,
        faculty: staff.faculty,
        role: staff.role,
        nic: staff.nic,
        token: generateToken(staff._id),
      });
    }
  });
  

const authStaff = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const staff = await Staff.findOne({ username });

  if (staff && (await staff.matchPassword(password))) {
    res.json({
        _id: staff._id,
        staffId: staff.staffId,
        username: staff.staffname,
        name: staff.name,
        email: staff.email,
        phone: staff.phone,
        address: staff.address,
        dob: staff.dob,
        faculty: staff.faculty,
        role: staff.role,
        nic:staff.nic,
        token: generateToken(staff._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
  
});

const getStaffProfile = asyncHandler(async (req, res) => {
    const staff = await Staff.findById(req.staff._id);
    if (staff) {
      res.json({
        id: staff._id,
        staffId: staff.staffId,
        username: staff.username,
        name: staff.name,
        email: staff.email,
        phone: staff.phone,
        address: staff.address,
        dob: staff.dob,
        faculty: staff.faculty,
        role: staff.role,
        nic: staff.nic
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });
module.exports = {registerStaff ,authStaff, getStaffProfile};
