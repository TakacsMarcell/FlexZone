const router = require("express").Router();
const WorkoutPlan = require("../models/WorkoutPlan");
const User = require("../models/Users");

// Új edzésterv létrehozása
router.post("/", async (req, res) => {
  try {
    const newPlan = new WorkoutPlan(req.body);
    const savedPlan = await newPlan.save();
    res.status(201).json(savedPlan);
  } catch (err) {
    res.status(400).json({ message: "Hiba az edzésterv mentésekor", error: err.message });
  }
});

// Ajánlott edzéstervek 
router.get("/recommended/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Ha nincs edzettségi szint akkor nincs ajánlott
    if (!user.fitnessLevel) {
      return res.status(200).json([]);
    }

    let query = { level: user.fitnessLevel };

    // Cél alapján típus ajánlás
    if (user.targetWeight && user.weight) {
      if (user.targetWeight < user.weight) {
        // fogyás
        query.type = { $in: ["kardio", "otthoni"] };
      } else {
        // izomtömeg növelés
        query.type = { $in: ["sulyemeles", "otthoni"] };
      }
    }

    // Nem alapján szűrés
    if (user.gender) {
      query.$or = [
        { genderTarget: "both" },
        { genderTarget: user.gender.toLowerCase() },
      ];
    }

    const plans = await WorkoutPlan.find(query).limit(5);
    res.status(200).json(plans);
  } catch (err) {
    res.status(500).json({ message: "Szerver hiba", error: err.message });
  }
});

// Összes edzésterv 
router.get("/", async (req, res) => {
  try {
    const { level, type, gender } = req.query;
    let filter = {};

    if (level) filter.level = level.toLowerCase();
    if (type) filter.type = type.toLowerCase();

    if (gender) {
      filter.$or = [
        { genderTarget: "both" },
        { genderTarget: gender.toLowerCase() },
      ];
    }

    const plans = await WorkoutPlan.find(filter);
    res.status(200).json(plans);
  } catch (err) {
    res.status(500).json({ message: "Szerver hiba", error: err.message });
  }
});

module.exports = router;
