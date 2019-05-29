const express = require("express");
const router = express.Router();
const staticController = require("../controllers/staticController");

router.get("/about", staticController.about);

module.exports = router;