const express = require("express");
const Club = require("../models/Club");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get all clubs
router.get("/", async (req, res) => {
  const clubs = await Club.find();
  res.json(clubs);
});

// Create club
router.post("/", protect, async (req, res) => {
  const club = await Club.create({
    ...req.body,
    createdBy: req.user.id
  });
  res.json(club);
});

module.exports = router;