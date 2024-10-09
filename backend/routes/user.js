// routes/user.routes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);

router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
