const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const productRoute = require("./routes/product");
const authRoute = require("./routes/auth");
const cartRoute = require("./routes/cart");
const userRoute = require("./routes/user");
const orderRoute = require("./routes/orders");
const stripeRoute = require("./routes/stripe");
const workoutsRoute = require("./routes/workouts");
const workoutProgressRoute = require("./routes/workoutProgress");
const tipsRoute = require("./routes/tips"); 
const cors = require("cors");

dotenv.config();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB csatlakozás sikeresen megtörtént!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoute);
app.use("/api/auth", authRoute);
app.use("/api/cart", cartRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/workouts", workoutsRoute);
app.use("/api/progress", workoutProgressRoute);
app.use("/api/tips", tipsRoute); 

app.listen(process.env.PORT || 5000, () => {
  console.log("A backend szerver fut!");
});
