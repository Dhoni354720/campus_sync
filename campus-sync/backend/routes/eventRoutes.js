const express = require("express");
const Event = require("../models/Event");
const User = require("../models/User"); // ✅ added
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Get all events
router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// ✅ Get user's registered events (PUT THIS ABOVE :id)
router.get("/my-events", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("registeredEvents");
    res.json(user.registeredEvents);
  } catch (err) {
    res.status(500).json({ message: "Error fetching events" });
  }
});

// ✅ Get single event
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Error fetching event" });
  }
});

// ✅ Create event
router.post("/", protect, async (req, res) => {
  const event = await Event.create(req.body);
  res.json(event);
});

// ✅ Register for event
router.post("/:id/register", protect, async (req, res) => {
  try {
    const userId = req.user.id;
    const eventId = req.params.id;

    const event = await Event.findById(eventId);
    const user = await User.findById(userId);

    if (!event || !user) {
      return res.status(404).json({ message: "User or Event not found" });
    }

    if (event.attendees.includes(userId)) {
      return res.status(400).json({ message: "Already registered" });
    }

    event.attendees.push(userId);
    user.registeredEvents.push(eventId);

    await event.save();
    await user.save();

    res.json({ message: "Registration successful" });

  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
});

module.exports = router;