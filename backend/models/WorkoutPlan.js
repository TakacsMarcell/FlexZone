const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },     
    sets: { type: Number, default: 3 },
    reps: { type: String, default: "10-12" },   
    description: { type: String, default: "" },
  },
  { _id: false }
);

const WorkoutPlanSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    level: {
      type: String,
      enum: ["kezdo", "halado", "profi"],
      required: true,
    },
    type: {
      type: String,
      enum: ["kardio", "sulyemeles", "otthoni"],
      required: true,
    },
    genderTarget: {
      type: String,
      enum: ["male", "female", "both"],
      default: "both",
    },
    exercises: { type: [ExerciseSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkoutPlan", WorkoutPlanSchema);
