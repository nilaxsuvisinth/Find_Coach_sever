const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const {authenticate}=require('../middleware/authenticate')
// Bookingcoach route
router.post('/bookingcoach/:id',authenticate, bookingController.createBooking);
router.get('/getBookingById/:id',authenticate, bookingController.bookingByResourceId);

module.exports = router;
