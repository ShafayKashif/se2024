import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";

// Import models
import Users from "./models/userModel.js";
import studentVendors from "./models/studentVendorModel.js";
import Vendors from "./models/vendorModel.js";
import Customers from "./models/customerModel.js";
import Couriers from "./models/courierModel.js";
import CustomerReviews from "./models/CustomerReviewModel.js";
import { Router } from "express";
import Order from "./models/ordersModel.js";
import Items from "./models/itemModel.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONG_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({
    id: user.id,
    email: user.email,
    role: user.role,
  }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// JWT Verification Middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) return res.status(401).send({ message: 'Access denied. No token provided.' });

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
  } catch (error) {
      res.status(400).send({ message: 'Invalid token.' });
  }
};



// Unified Signup Route
app.post("/signup", upload.single("image"), async (req, res) => {
  const { email, password, usertype, name, phone_Number, roll_Number, room_Number, hostel } = req.body;
  let Model = Users; // Default to general Users model
  let newUser;

  // Check for existing user in general Users model
  let user = await Users.findOne({ email });
  if (user) return res.status(400).json({ msg: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  switch (usertype) {
    case "student_vendor":
      Model = studentVendors;
      newUser = { email, roll_Number, room_Number, hostel, name, phone_Number, password: hashedPassword };
      break;
    case "vendor":
      Model = Vendors;
      newUser = { email, name, phone_Number, password: hashedPassword };
      break;
    case "courier":
      Model = Couriers;
      newUser = { email, roll_Number, name, phone_Number, password: hashedPassword };
      break;
    case "customer":
      Model = Customers;
      newUser = { email, roll_Number, room_Number, hostel, name, phone_Number, password: hashedPassword };
      break;
    default:
      return res.status(400).send("Invalid user type");
  }

  try {
    const savedUser = new Model(newUser);
    await savedUser.save();

    // Also save to general Users model if necessary
    await new Users({ email, password: hashedPassword, role: usertype }).save();

    const token = generateToken(savedUser);
    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Users.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

    // Generate token
    const token = generateToken(user);
    console.log("User Role:", user.role);
    res.json({ token, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



//Shehbaz
//Make your API calls for every usecase here
app.post("/add_item",async (request, response) => {
  //Shehbaz
  if (request.body.type === "add_item") {
    console.log("adding item");
    try {
      let { itemName, category, stock, price,image, vendorEmail,calories } = request.body;
      vendorEmail = vendorEmail || "default@email.com";

    // Find the maximum itemId in the database
    const maxItemId = await Items.findOne({}, { itemId: 1 }, { sort: { itemId: -1 } });

    let nextItemId = 1;
    if (maxItemId) {
      nextItemId = maxItemId.itemId + 1;
    }


      // Create a new item in the database
      const newItem = new Items({
        itemId:nextItemId,
        itemName,
        category,
        stock,
        price,
        image,
        vendorEmail,
        calories,
      });

      const savedItem = await newItem.save();

      console.log("Item added successfully:", savedItem);
      response.status(200).json({ message: "Item added successfully" });
    } catch (error) {
      console.error("Error adding item:", error);
      response
        .status(500)
        .json({ message: "Failed to add item. Please try again." });
    }
  }
});


app.post('/items', async (req, res) => {
  //Shehbaz
  console.log(req.body)
  console.log("Showing Items")
  try {
    let { email } = req.body;
    // If email is null or undefined, assign a default value
    email = email || "default@email.com";
    const items = await Items.find({ vendorEmail: email }).limit(4); 
    console.log(items)
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    
    res.status(500).json({ error: 'Server error' });
  }
});
