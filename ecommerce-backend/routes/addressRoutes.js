const express = require("express");
const router = express.Router();
const {
  getAddresses,
  addOrUpdateAddress,
  deleteAddress
} = require("../controllers/addressController");

router.get("/:userId", getAddresses);
router.post("/save", addOrUpdateAddress);
router.delete("/delete", deleteAddress);

module.exports = router;
