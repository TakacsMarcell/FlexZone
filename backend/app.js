const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const productRoute = require("./routes/product");
const authRoute = require("./routes/auth");


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


app.listen(process.env.PORT || 5000, () => {
  console.log("A backend szerver fut!");
});
