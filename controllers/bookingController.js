const Booking = require('../models/bookingSchema');

const createBooking = async (req, res) => {
  try {
    const{id}=req.params;
    const { name, email, address, nic, contactNumber } = req.body;
    const newBooking = new Booking({
      name,
      resourceId:id,
      email,
      address,
      nic,
      contactNumber
    });
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const bookingByResourceId = async (req, res) => {
  try {
    const{id}=req.params;
   if(id!==""){
    console.log(id);
    const savedBooking = await Booking.find( {resourceId : id} );
    if(savedBooking){
      res.status(200).json(savedBooking);
    }
  }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




module.exports = {
  createBooking,bookingByResourceId
};
