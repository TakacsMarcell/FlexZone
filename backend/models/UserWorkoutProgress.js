const mongoose = require("mongoose");

const UserWorkoutProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkoutPlan",
      required: true,
    },

    completedExercises: { type: [String], default: [] },

    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserWorkoutProgressSchema.index({ userId: 1, planId: 1 }, { unique: true });

module.exports = mongoose.model(
  "UserWorkoutProgress",
  UserWorkoutProgressSchema
);
