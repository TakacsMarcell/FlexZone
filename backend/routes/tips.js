const router = require("express").Router();
const Tip = require("../models/Tip");

// GET összes tipp
router.get("/", async (req, res) => {
  try {
    const tips = await Tip.find();
    res.status(200).json(tips);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST új tipp
router.post("/", async (req, res) => {
  const newTip = new Tip(req.body);
  try {
    const savedTip = await newTip.save();
    res.status(201).json(savedTip);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
