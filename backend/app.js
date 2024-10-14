const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();

const userRoutes = require("./routes/user");
const employeeRoutes = require("./routes/employee");

const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "http://localhost:4200",
  methods: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Origin",
    "X-Requested-With",
    "Accept",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://Manas:M4MOTLkZ05CTtavu@test.3kuak.mongodb.net/test?retryWrites=true&w=majority&appName=test"
  )
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log("Failed to Connect", err.message);
  });

app.use("/api/users", userRoutes);
app.use("/api/employees", employeeRoutes);

module.exports = app;

// Manas
// Ml9m4OJRCVaalZce
