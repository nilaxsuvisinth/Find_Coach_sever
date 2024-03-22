const express = require('express');
const router = express.Router();
const { getUsers, deleteUser, getResources, deleteResource, getAllBookings, verifyResource, getMessages, sendEmail } = require('../controllers/adminController');
const { isAdmin, authenticate } = require('../middleware/authenticate');

// Get all users
router.get('/users', getUsers);

// Delete user by ID
router.delete('/users/:id', deleteUser);

// Get all resources
router.get('/resources', getResources);

// Delete resource by ID
router.delete('/resources/:id', deleteResource);

// Verify resource
router.put('/resources/:id/verify',authenticate, isAdmin, verifyResource)

// Route to get all admin details
router.get('/bookingdetails', getAllBookings);

// Get all feedbacks
router.get('/messages', getMessages);

// Sending emails
router.post('/api/admin/sendemail', sendEmail);

module.exports = router;
