const router = require("express").Router();
const User = require("../models/Users");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json("Wrong username or password!");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (OriginalPassword !== req.body.password)
      return res.status(401).json("Wrong username or password!");

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// FORGOT PASSWORD
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email szükséges." });

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .json({ message: "Ha létező email, küldtünk levelet." });
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = CryptoJS.SHA256(rawToken).toString();

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = new Date(Date.now() + 1000 * 60 * 60);
    await user.save();

    const resetUrl = `${FRONTEND_URL}/reset-password/${rawToken}`;

    const mailOptions = {
      from: `"Flexzone Webshop" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Jelszó visszaállítás",
      html: `
        <p>Jelszó visszaállítását kérted a fiókodhoz.</p>
        <p>Kattints az alábbi linkre az új jelszó megadásához (1 óráig érvényes):</p>
        <p><a href="${resetUrl}" target="_blank">${resetUrl}</a></p>
        <p>Ha nem te kérted, hagyd figyelmen kívül ezt a levelet.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Ha létező email, küldtünk levelet." });
  } catch (err) {
    res.status(500).json({ message: "Szerver hiba" });
  }
});

// RESET PASSWORD
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password)
      return res.status(400).json({ message: "Új jelszó szükséges." });

    const hashedToken = CryptoJS.SHA256(token).toString();

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: new Date() },
    });

    if (!user)
      return res
        .status(400)
        .json({ message: "Érvénytelen vagy lejárt token." });

    user.password = CryptoJS.AES.encrypt(
      password,
      process.env.PASS_SEC
    ).toString();
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;

    await user.save();
    res
      .status(200)
      .json({ message: "Jelszó sikeresen frissítve. Jelentkezz be." });
  } catch (err) {
    res.status(500).json({ message: "Szerver hiba" });
  }
});

module.exports = router;
