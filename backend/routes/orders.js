const Order = require("../models/Orders");
const Product = require("../models/Product"); 
const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const nodemailer = require("nodemailer");

const sendOrderEmail = async (order, userEmail) => {
  try {
    
    const populatedProducts = await Promise.all(
      order.products.map(async (p) => {
        const product = await Product.findById(p.productId);
        return {
          ...p._doc,
          title: product ? product.title : "Ismeretlen termék",
        };
      })
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Flexzone Webshop" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `Rendelés visszaigazolás – #${order._id}`,
      html: `
        <h2>Köszönjük a rendelésed!</h2>
        <p>Rendelés azonosító: <b>${order._id}</b></p>
        <h3>Termékek:</h3>
        <ul>
          ${populatedProducts
            .map((p) => `<li>${p.title} – Mennyiség: ${p.quantity}</li>`)
            .join("")}
        </ul>
        <p><b>Összeg:</b> ${order.amount} Ft</p>
        <p><b>Szállítási cím:</b> ${order.address?.city || ""}, ${
        order.address?.line1 || ""
      }</p>
        <p>Üdvözlettel,<br/>Flexzone csapat</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email elküldve:", userEmail);
  } catch (err) {
    console.error("Email hiba:", err.message);
  }
};

router.post("/", async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();

    res.status(200).json(savedOrder);

    if (req.body.email) {
      setImmediate(() => {
        sendOrderEmail(savedOrder, req.body.email);
      });
    } else {
      console.warn("Nincs email a rendelésben, nem tudok levelet küldeni");
    }
  } catch (err) {
    console.error("Order mentési hiba:", err.message);
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL ORDERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
