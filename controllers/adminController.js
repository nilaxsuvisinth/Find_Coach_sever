const asyncHandler = require('express-async-handler');
const bcryptjs = require('bcryptjs');
const Users = require('../models/userSchema');
const Resource = require('../models/resourceSchema');
const Booking = require('../models/bookingSchema');
const Message = require('../models/msgSchema'); 
const { login } = require('./userController');
const nodemailer = require('nodemailer');

// Get all users
const getUsers = asyncHandler(async (req, res) => {
  const users = await Users.find({});
  res.json(users);
});

// Delete user
const deleteUser = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  try {
    await user.deleteOne();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

// Get all Resources
const getResources = asyncHandler(async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json({
      success: true,
      message: 'Resources retrieved successfully',
      resources
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving resources',
      error: error.message
    });
  }
});

// Delete Resource
const deleteResource = asyncHandler(async (req, res) => {
  const resourceId = req.params.id;
  try {
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    await resource.deleteOne();
    res.json({ message: 'Resource deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resource' });
  }
});

// Verify Resource
const verifyResource = asyncHandler (async (req, res) => {
  try {
    const resourceId = req.params.id;
    const resource = await Resource.findById(resourceId);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    resource.verified = true; 
    await resource.save();

    res.json({ message: 'Resource verified successfully', resource });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const getAllBookings = asyncHandler(async (req, res) => {
  try {
    // Assuming 'Booking' is the Mongoose model for bookings
    const bookings = await Booking.find();
    res.status(200).json({
      success: true,
      message: 'Bookings retrieved successfully',
      bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving bookings',
      error: error.message
    });
  }
});


const getMessages = async (req, res) => {
  try {
    const messages = await Message.find(); 
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  } 
};

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASS
  }
});

// Define your sendEmail function
const sendEmail = async (owneremail) => {
  try {
    await transporter.sendMail({
      from: process.env.GMAIL,
      to: owneremail,
      subject: 'Subject of your email',
      text: 'This is the body of your email.'
    });
    console.log('Email sent to:', owneremail);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};

module.exports = {
  getUsers,
  deleteUser,
  getResources,
  deleteResource,
  getAllBookings,
  verifyResource,
  getMessages,
  sendEmail
};
