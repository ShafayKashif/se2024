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

mongoose
  .connect(process.env.MONG_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// JWT Verification Middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token)
    return res
      .status(401)
      .send({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send({ message: "Invalid token." });
  }
};

// Unified Signup Route
app.post("/signup", upload.single("image"), async (req, res) => {
  const {
    email,
    password,
    usertype,
    name,
    phone_Number,
    roll_Number,
    room_Number,
    hostel,
  } = req.body;
  let Model = Users; // Default to general Users model
  let newUser;

  // Check for existing user in general Users model
  let user = await Users.findOne({ email });
  if (user) return res.status(400).json({ msg: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  switch (usertype) {
    case "student_vendor":
      Model = studentVendors;
      newUser = {
        email,
        roll_Number,
        room_Number,
        hostel,
        name,
        phone_Number,
        password: hashedPassword,
      };
      break;
    case "vendor":
      Model = Vendors;
      newUser = { email, name, phone_Number, password: hashedPassword };
      break;
    case "courier":
      Model = Couriers;
      newUser = {
        email,
        roll_Number,
        name,
        phone_Number,
        password: hashedPassword,
      };
      break;
    case "customer":
      Model = Customers;
      newUser = {
        email,
        roll_Number,
        room_Number,
        hostel,
        name,
        phone_Number,
        password: hashedPassword,
      };
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


// Source: Chat GPT
// Function to calculate Jaccard similarity between two strings
function jaccardSimilarity(str1, str2) {
  const set1 = new Set(str1);
  const set2 = new Set(str2);

  // Calculate intersection size
  let intersectionSize = 0;
  set1.forEach(element => {
      if (set2.has(element)) {
          intersectionSize++;
      }
  });

  // Calculate union size
  const unionSize = set1.size + set2.size - intersectionSize;

  // Calculate Jaccard similarity
  if (unionSize === 0) {
      return 0; // If union is empty, return 0 to avoid division by zero
  } else {
      return intersectionSize / unionSize;
  }
}


app.post("/query", async (request, response) => {
  if (request.body.type && request.body.type=== "food-search")
  {
    console.log("Request: ", request.body.query);

    try {
      const query = request.body.query;
      const results = await Items.find(); // retrieve all food items
      console.log("Results: ", results);

      // Filter items based on similarity of their names
      const filteredItems = results.filter(item => {

        // Calculate similarity score between item name and search query
        const similarityScore = jaccardSimilarity(item.itemName.toLowerCase(), query.toLowerCase());
        return similarityScore >= 0.5; // Adjust threshold as needed    
      });

      response.status(200).json(filteredItems);
      console.log("Filtered Food items list: ", filteredItems);

    } catch (error) {
      console.error("Error searching for food items:", error);
      response.status(500).json({ error: "Internal server error" });
    }

  }
});

//hassan ali reviews and place order
app.post("/logreview", async (request, response) => {
if (
  request.body.type === "review" &&
  request.body.usertype === "customer"
) {
  console.log("Review of customer received");
  try {
    const { vendor_email, customer_email, rating, comment } = request.body;

    const newReview = new CustomerReviews({
      vendor_email,
      customer_email,
      rating,
      comment,
    });
    const savedReview = await newReview.save();
    console.log("Review submitted:", savedReview);
    response.status(200).json({ isAuthenticated: true });
  } catch (error) {
    console.error("Error submitting review:", error);
  }
}
});

app.post("/placeOrder", async (request, response) => {
if (request.body.type === "placeOrder" && request.body.usertype === "customer") {
  console.log("Placing order");
  try {
    const { vendor_email, customer_email, quantity, item_name, price, total } = request.body;
    const newOrder = new Carts({
      vendor_email,
      customer_email,
      quantity,
      item_name,
      price,
      total,
    });
    const savedOrder = await newOrder.save();
    console.log("Order placed:", savedOrder);
    response.status(200).json({ isAuthenticated: true });
  } catch (error) {
    console.error("Error placing order:", error);
  }
}
});


app.post("/selfpickup", async (request, response) => {
if (request.body.type === "selfpickup" && request.body.usertype === "customer") {
  console.log("selfpicking order");
  try {
    const { vendor_email, vendorname, customer_email, customername,  quantity, item_name, clientAddr, vendorAddr, status, } = request.body;
    const newOrder = new Order({
      vendorEmail: vendor_email,
      clientEmail: customer_email,
      vendor: vendorname,
      client: customername,
      quantity,
      item_name,
      client_addr: clientAddr,
      vendor_addr: vendorAddr,
      status,
    });
    const savedOrder = await newOrder.save();
    console.log("Order placed:", savedOrder);
    response.status(200).json({ isAuthenticated: true });
  } catch (error) {
    console.error("Error placing order:", error);
  }
}
});

app.get("/order", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/studentvendors", async (req, res) => {
  try {
    const vendors = await studentVendors.find();
    res.json(vendors);
  } catch (error) {
    console.error("Error fetching vendors idher hi:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/vendors", async (req, res) => {
  try {
    const vendors = await Vendors.find();
    res.json(vendors);
  } catch (error) {
    console.error("Error fetching vendors:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/customers", async (req, res) => {
  try {
    const customers = await Customers.find();
    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/items", async (req, res) => {
  try {
    const items = await Items.find();
    res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).send("Internal Server Error");
  }
});