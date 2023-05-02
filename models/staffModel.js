const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const staffSchema = new mongoose.Schema({
    staffId: {type: String, required: true},
    name: {type:String, required: true},
    username: { type: String, required: true},
    password: { type: String, required: true },
    email: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    dob: {type: String, required: true},
    faculty: {type: String, required: true},
    role: {type: String, required: true},
    nic: {type:String, required: true},
});

staffSchema.methods.matchPassword = async function (enteredPassword) {
  console.log("Enter",enteredPassword,"This",this.password)
  return await bcrypt.compare(enteredPassword, this.password);
};

staffSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});



const Staff = mongoose.model("staff", staffSchema);

module.exports = Staff;
