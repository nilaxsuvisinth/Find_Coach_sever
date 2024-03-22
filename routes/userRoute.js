const express = require("express");
const router = express.Router();
const { register, login, logout, message, getUserProfile, updateProfile } = require("../controllers/userController");
const {authenticate}=require('../middleware/authenticate')

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/message', message);
router.get('/users',authenticate, getUserProfile);
router.put('/users/:id', updateProfile);

module.exports = router;
