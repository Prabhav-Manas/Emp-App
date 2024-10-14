// routes/employee.js
const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee");
const verifyToken = require("../middlewares/verifyToken");

// POST route to create an employee
router.post("/add-employee", employeeController.createEmployee);
router.get("/all-employees", verifyToken, employeeController.getAllEmployees);
router.get("/employee/:id", verifyToken, employeeController.getEmployeeById);
router.patch("/employee/:id", verifyToken, employeeController.updateEmployee);
router.delete("/employee/:id", verifyToken, employeeController.deleteEmployee);

module.exports = router;
