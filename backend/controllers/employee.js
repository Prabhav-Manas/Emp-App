// controllers/employee.js
const Employee = require("../models/employee");

// ---Create Employees---
exports.createEmployee = async (req, res, next) => {
  const { name, age, gender, designation, photo } = req.body;

  try {
    // Validate if required fields are present
    if (!name || !age || !gender || !designation) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create new employee object
    const newEmployee = new Employee({
      name,
      age,
      gender,
      designation,
    });

    // Save to the database
    await newEmployee.save();

    // Send success response
    res.status(201).json({
      message: "Employee created successfully.",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Error while creating employee:", error.message);
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};

// ---Fetch All Employees---
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find(); // Fetch all employees from the DB

    // If no employees found, send a message
    if (employees.length === 0) {
      return res.status(404).json({ message: "No employees found." });
    }

    // Send the list of employees
    res.status(200).json({
      message: "Employees fetched successfully.",
      employees,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// ---Fetch Single Employee---
exports.getEmployeeById = async (req, res) => {
  const employeeId = req.params.id;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }
    res.status(200).json({
      message: "Employee fetched successfully",
      employee: employee,
    });
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({
      message: "Failed to fetch employee",
    });
  }
};

// ---Update Employee---
exports.updateEmployee = async (req, res) => {
  const employeeId = req.params.id;
  const updatedData = req.body; // Get updated data from request body

  try {
    const employee = await Employee.findByIdAndUpdate(employeeId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      employee: employee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Failed to update employee" });
  }
};

// ---Delete Employee---
exports.deleteEmployee = async (req, res) => {
  const empId = req.params.id;

  try {
    const result = await Employee.findByIdAndDelete(empId);

    if (!result) {
      return res.status(404).json({
        message: "Employee not found.",
      });
    }

    res.status(200).json({
      message: "Employee deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};
