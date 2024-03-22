const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  resourceId:{
    type:mongoose.Schema.ObjectId,
    ref:"RESOURCE",
    required:true
},
  email: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  nic: {
    type: String
  },
  contactNumber: {
    type: Number,
    required: true
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
