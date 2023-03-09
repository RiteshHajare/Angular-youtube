const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },

  videos:[{video:String,comments:[{user:String,comment:String}]}],


});

module.exports = mongoose.model("User",userSchema);
