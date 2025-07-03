const express = require("express");

const {authenticateUser , authorizeRoles} = require("../middleware/authMiddleware")

const router = express.Router();

router.get("/admin-dashboard", authenticateUser, authorizeRoles("Admin"), (req, res) => {
    res.json({message: "Welcome to the Admin Dashboard"});
});

module.exports = router;
