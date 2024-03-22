const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Message = require("../models/msgSchema");
const Users = require('../models/userSchema');
const Resource = require('../models/resourceSchema');

// register
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        const newUser = new Users({
            username: username,
            email: email,
            password: password,
    
        });

        const createdUser = await newUser.save();
        console.log(createdUser);
        res.status(200).json("Registered");

    } catch (error) {
        res.status(400).json(error.message);
    }
}

// login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const token = await user.generateToken();
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 86400000),
            httpOnly: true
        });
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

// logout
const logout = async (req, res) => {
    try {
        res.clearCookie('jwt');
        res.status(200).send('LoggedOut');
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
};

// message
const message = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newMessage = new Message({ name, email, message });
        const createdMessage = await newMessage.save();
        console.log(createdMessage);
        res.status(200).send("Sent");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
};

// user profile
const getUserProfile = async (req, res) => {
    try {
      const { _id } = req.user;
      const user = await Users.findById(_id);
      const coach=await Resource.findOne({userId:_id})
    

      if (!user) {
        return res.status(404).send('User not found');
      }
     
      if(coach){
        console.log({ success: true, user:user,coach:coach });
        res.status(200).json({ success: true, user:user,coach:coach });
        
      }else{
        res.status(200).json({ success: true, user });
      }
      
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  };

// update profile
const updateProfile = async (req, res) => {
    try {
        let newUserData = { name: req.body.name, email: req.body.email };
        let avatar;

        if (req.file) {
            avatar = `${req.protocol}://${req.get('host')}/uploads/user/${req.file.originalname}`;
            newUserData = { ...newUserData, avatar };
        }

        const user = await Users.findByIdAndUpdate(req.params.id, newUserData, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
};

module.exports = { register, login, logout, message, getUserProfile, updateProfile };