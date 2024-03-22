const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoutes = require("./routes/userRoute");
const resourceRoutes = require("./routes/resourceRoute");
const adminRoute = require("./routes/adminRoute");
const bookingRoute = require("./routes/bookingRoute");

const app = express();

// Load environment variables
dotenv.config({ path: './config.env' });

// Connect to the database
require('./db/conn');

// Set up port
const port = process.env.PORT;

// Enable CORS
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Parse incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Parse cookies
app.use(cookieParser());

// Route handling
app.use("/api/user", userRoutes);
app.use("/api/user", resourceRoutes);
app.use("/api/admin", adminRoute);
app.use("/api/booking", bookingRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
