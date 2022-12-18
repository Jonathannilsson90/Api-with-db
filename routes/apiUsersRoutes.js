const express = require("express");
const router = express.Router();
const controller = require("../controllers/apiUsersController");

router.post("/register", controller.registerUser);
router.post("/token", controller.generateAccessToken);
router.delete("/deleteUser", controller.deleteUser);
router.get("/register", controller.getAllUsers);
module.exports = router;
