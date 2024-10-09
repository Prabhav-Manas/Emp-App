const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const employeeRoutes = require("./routes/employee");

const app = express();

const corsOptions = {
  origin: "http://localhost:4200",
  methods: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost:27017/emp-app")
  .then(() => {
    console.log("Connected to DB!");
  })
  .catch((err) => {
    console.log("Failed to connect 💥:=>", err.message);
  });

app.use("/api/users", userRoutes);
app.use("/api/employees", employeeRoutes);

module.exports = app;
