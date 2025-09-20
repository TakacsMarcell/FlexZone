const router = require("express").Router();
const UserWorkoutProgress = require("../models/UserWorkoutProgress");
const WorkoutPlan = require("../models/WorkoutPlan");

router.get("/:planId", async (req, res) => {
  try {
    const { userId } = req.query;
    const planId = req.params.planId;

    if (!userId) {
      return res.status(400).json({ message: "userId szükséges!" });
    }

    const prog = await UserWorkoutProgress.findOne({ userId, planId });

    if (!prog) {
      return res.status(200).json({
        userId,
        planId,
        completedExercises: [],
        completed: false,
      });
    }

    res.status(200).json({
      userId: prog.userId,
      planId: prog.planId,
      completedExercises: prog.completedExercises,
      completed: prog.completed || false,
    });
  } catch (err) {
    res.status(500).json({ message: "Szerver hiba", error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { userId, planId, completedExercises } = req.body;

    if (!userId || !planId) {
      return res.status(400).json({ message: "userId és planId szükséges!" });
    }

    const plan = await WorkoutPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Terv nem található!" });
    }

    const isCompleted =
      (completedExercises?.length || 0) === (plan.exercises?.length || 0);

    const updated = await UserWorkoutProgress.findOneAndUpdate(
      { userId, planId },
      {
        $set: {
          completedExercises: completedExercises || [],
          completed: isCompleted,
        },
      },
      { upsert: true, new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Szerver hiba", error: err.message });
  }
});

module.exports = router;
