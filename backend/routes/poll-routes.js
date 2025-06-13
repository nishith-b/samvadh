const express = require("express");
const { protect } = require("../middleware/auth");
const { createPoll } = require("../controllers/poll-controller");

const router = express.Router();

router.post("/create", protect, createPoll);

module.exports = router;
