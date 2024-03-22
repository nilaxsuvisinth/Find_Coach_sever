const asyncHandler = require("express-async-handler");
const Users = require('../models/userSchema');
const jwt = require('jsonwebtoken');


const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).send("No token provided");
        }

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await Users.findOne({ _id: verifyToken._id });

        if (!rootUser) {
            return res.status(401).send("User not found");
        }

        req.user = rootUser;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};


const isAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).send("No token provided");
        }

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await Users.findOne({ _id: verifyToken._id });

        if (!rootUser) {
            return res.status(401).send("User not found");
        }

        if (rootUser.role !== "admin") {
            return res.status(403).send("You are not an admin");
        }

        req.user = rootUser;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

// const isAdmin = asyncHandler(async (req, res, next) => {
//     try {
//         const token = req.cookies.jwt;
//         if (!token) {
//             return res.status(401).send("No token provided");
//         }

//         const decoded = jwt.verify(token, process.env.SECRET_KEY);
//         const user = await Users.findById(decoded._id);
//         if (!user) {
//             return res.status(401).send("User not found");
//         }

//         if (user.role !== "admin") {
//             return res.status(403).send("You are not an admin");
//         }

//         req.user = user; // Optionally, you can set req.user here
//         next();
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Internal Server Error");
//     }
// });

module.exports = { authenticate, isAdmin };