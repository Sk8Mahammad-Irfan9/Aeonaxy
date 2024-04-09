const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    maxlength: 30
  },
  imagePath: {
    type: String,
  },
  userName: {
    type: String,
    require: true,
    trim: true,
    maxlength: 20
    
  },
  email: {
    type: String,
    require: true,
    trim: true,
    maxlength: 30,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
});

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
