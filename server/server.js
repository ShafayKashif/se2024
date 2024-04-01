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
import Carts from "./models/cartsModel.js";  

//controllers
import { showitems , add_item , ViewCustomerReviews} from "./controllers/vendorController.js";

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

// Token implmentaion learned by https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/ and through chatgpt
//JWT Token Generation
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
  const token = authHeader && authHeader.split(" ")[1];

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
  let Model = Users;
  let newUser;

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

    // token generation
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
app.post("/add_item", add_item );
app.post("/showitems", showitems );
app.post("/ViewCustomerReviews", ViewCustomerReviews );




// Source: Chat GPT
// Function to calculate Jaccard similarity between two strings
function jaccardSimilarity(str1, str2) {
  const set1 = new Set(str1);
  const set2 = new Set(str2);

  // Calculate intersection size
  let intersectionSize = 0;
  set1.forEach((element) => {
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
  if (request.body.type && request.body.type === "food-search") {
    console.log("Request: ", request.body.query);

    try {
      const query = request.body.query;
      const results = await Items.find(); // retrieve all food items
      console.log("Results: ", results);

      // Filter items based on similarity of their names
      const filteredItems = results.filter((item) => {
        // Calculate similarity score between item name and search query
        const similarityScore = jaccardSimilarity(
          item.itemName.toLowerCase(),
          query.toLowerCase()
        );
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

//HASSAN ALI reviews and place order
//below is an "API call" i presume, mostly inspired by the initial login and signup designes we did, i think those were by shehbaz. i jut changed the body.type to review and usertype to customer as an identifier (also this if exists because initially, we used the same api.post("/") call and redirected using if conditions) anyways, a pretty self explanatory function, extracts vendor, customer email, rating and comment from request body and saves it in the database and sends 200 status code as a response, if successful (later used to redirect on the front end side)
app.post("/logreview", async (request, response) => {
  if (request.body.type === "review" && request.body.usertype === "customer") {
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

//places order on database (cartitems table) received from front end, this p much isnt available to others, later used in view cart functionality (not implemented yet) (this and below ones (by hassan) inspired by the leave a review function)
app.post("/placeOrder", async (request, response) => {
  if (
    request.body.type === "placeOrder" &&
    request.body.usertype === "customer"
  ) {
    console.log("Placing order");
    try {
      const {
        vendor_email,
        customer_email,
        quantity,
        item_name,
        item_id,
        price,
        total,
        imglink,
        itemId,
      } = request.body;
      const newOrder = new Carts({
        vendor_email,
        customer_email,
        quantity,
        item_name,
        item_id,
        price,
        total,
        image: imglink,
        itemId,
      });
      const savedOrder = await newOrder.save();
      console.log("Order placed:", savedOrder);
      response.status(200).json({ isAuthenticated: true });
    } catch (error) {
      console.error("Error placing order:", error);
    }
  }
});

// [EXPERIMENTAL] puts the order data into orders table, as in its an official order now which everyone can access
app.post("/selfpickup", async (request, response) => {
  if (
    request.body.type === "selfpickup" &&
    request.body.usertype === "customer"
  ) {
    console.log("selfpicking order");
    try {
      const {
        vendor_email,
        vendorname,
        customer_email,
        customername,
        quantity,
        item_name,
        item_id,
        clientAddr,
        vendorAddr,
        price,
        total,
        status,
        itemId,
      } = request.body;
      console.log("request body: ", request.body);
      const newOrder = new Order({
        vendorEmail: vendor_email,
        clientEmail: customer_email,
        vendor: vendorname,
        client: customername,
        quantity,
        item_name,
        price,
        total,
        client_addr: clientAddr,
        vendor_addr: vendorAddr,
        delivery: false,
        status,
        item_id: itemId,
      });
      const savedOrder = await newOrder.save();
      console.log("Order placed:", savedOrder);
      response.status(200).json({ isAuthenticated: true });
    } catch (error) {
      console.error("Error placing order:", error);
    }
  }
});

app.post("/selfpickupCart", async (request, response) => {
  if (
    request.body.type === "selfpickup" &&
    request.body.usertype === "customer"
  ) {
    console.log("selfpicking order");
    try {
      const {
        vendor_email,
        vendorname,
        customer_email,
        customername,
        quantity,
        item_name,
        clientAddr,
        vendorAddr,
        price,
        total,
        status,
        itemId,
      } = request.body;
      console.log("request body: ", request.body);
      const newOrder = new Order({
        vendorEmail: vendor_email,
        clientEmail: customer_email,
        vendor: vendorname,
        client: customername,
        quantity,
        item_name,
        price,
        total,
        client_addr: clientAddr,
        vendor_addr: vendorAddr,
        delivery: false,
        status,
        item_id: itemId,
      });
      try {
        const deletedCart = await Carts.deleteOne({ customer_email });
        console.log("Deleted cart:", deletedCart);
        response.status(200).json({ message: "Cart deleted successfully" });
      } catch (error) {
        console.error("Error deleting cart:", error);
        response.status(500).json({ error: "An error occurred while deleting cart" });
      }
      const savedOrder = await newOrder.save();
      console.log("Order placed:", savedOrder);
      response.status(200).json({ isAuthenticated: true });
    } catch (error) {
      console.error("Error placing order:", error);
    }
  }
});


app.post("/customerDelivery", async (request, response) => {
  if (
    request.body.type === "delivery" &&
    request.body.usertype === "customer"
  ) {
    console.log("selfpicking order");
    try {
      const {
        vendor_email,
        vendorname,
        customer_email,
        customername,
        quantity,
        item_name,
        item_id,
        clientAddr,
        vendorAddr,
        price,
        total,
        status,
        itemId,
      } = request.body;
      console.log("request body: ", request.body);
      const newOrder = new Order({
        vendorEmail: vendor_email,
        clientEmail: customer_email,
        vendor: vendorname,
        client: customername,
        quantity,
        item_name,
        price,
        total,
        client_addr: clientAddr,
        vendor_addr: vendorAddr,
        delivery: false,
        status,
        item_id: itemId,
      });
      const savedOrder = await newOrder.save();
      console.log("Order placed:", savedOrder);
      response.status(200).json({ isAuthenticated: true });
    } catch (error) {
      console.error("Error placing order:", error);
    }
  }
});

app.post("/selfpickupCart", async (request, response) => {
  if (
    request.body.type === "selfpickup" &&
    request.body.usertype === "customer"
  ) {
    console.log("selfpicking order");
    try {
      const {
        vendor_email,
        vendorname,
        customer_email,
        customername,
        quantity,
        item_name,
        clientAddr,
        vendorAddr,
        price,
        total,
        status,
        itemId,
      } = request.body;
      console.log("request body: ", request.body);
      const newOrder = new Order({
        vendorEmail: vendor_email,
        clientEmail: customer_email,
        vendor: vendorname,
        client: customername,
        quantity,
        item_name,
        price,
        total,
        client_addr: clientAddr,
        vendor_addr: vendorAddr,
        delivery: false,
        status,
        item_id: itemId,
      });
      try {
        const deletedCart = await Carts.deleteOne({ customer_email });
        console.log("Deleted cart:", deletedCart);
        response.status(200).json({ message: "Cart deleted successfully" });
      } catch (error) {
        console.error("Error deleting cart:", error);
        response.status(500).json({ error: "An error occurred while deleting cart" });
      }
      const savedOrder = await newOrder.save();
      console.log("Order placed:", savedOrder);
      response.status(200).json({ isAuthenticated: true });
    } catch (error) {
      console.error("Error placing order:", error);
    }
  }
});


app.post("/customerDelivery", async (request, response) => {
  if (
    request.body.type === "delivery" &&
    request.body.usertype === "customer"
  ) {
    console.log("selfpicking order");
    try {
      const {
        vendor_email,
        vendorname,
        customer_email,
        customername,
        quantity,
        item_name,
        clientAddr,
        vendorAddr,
        price,
        total,
        status,
        itemId,
      } = request.body;
      const newOrder = new Order({
        vendorEmail: vendor_email,
        clientEmail: customer_email,
        vendor: vendorname,
        client: customername,
        quantity,
        item_name,
        client_addr: clientAddr,
        vendor_addr: vendorAddr,
        price,
        total,
        delivery: true,
        status,
        item_id: itemId,
      });
      
      const savedOrder = await newOrder.save();
      console.log("Order placed:", savedOrder);
      response.status(200).json({ isAuthenticated: true });
    } catch (error) {
      console.error("Error placing order:", error);
    }
  }
});


app.post("/customerDeliveryCart", async (request, response) => {
  if (
    request.body.type === "delivery" &&
    request.body.usertype === "customer"
  ) {
    console.log("delivery cart order");
    try {
      const {
        vendor_email,
        vendorname,
        customer_email,
        customername,
        quantity,
        item_name,
        clientAddr,
        vendorAddr,
        price,
        total,
        status,
        itemId,
      } = request.body;
      const newOrder = new Order({
        vendorEmail: vendor_email,
        clientEmail: customer_email,
        vendor: vendorname,
        client: customername,
        quantity,
        item_name,
        item_id,
        client_addr: clientAddr,
        vendor_addr: vendorAddr,
        price,
        total,
        delivery: true,
        status,
        item_id: itemId,
      });
      try {
        const deletedCart = await Carts.deleteOne({ customer_email });
        console.log("Deleted cart:", deletedCart);
        response.status(200).json({ message: "Cart deleted successfully" });
      } catch (error) {
        console.error("Error deleting cart:", error);
        response.status(500).json({ error: "An error occurred while deleting cart" });
      }
      const savedOrder = await newOrder.save();
      console.log("Order placed:", savedOrder);
      response.status(200).json({ isAuthenticated: true });
    } catch (error) {
      console.error("Error placing order:", error);
    }
  }
});



// this function is inspired by the one talha wrote in his branch for fetching orders for his courier page, this one primarily is used to get all order details so cross verification can be done whether the customer reviewing a vendor ordered from them or not
app.get("/order", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/customerCart", async (req, res) => {
  try {
    const carts = await Carts.find();
    res.json(carts);
  } catch (error) {
    console.error("Error fetching carts:", error);
    res.status(500).send("Internal Server Error");
  }

});

// same inspiration as above, this one returns all student vendors for cross validation
app.get("/studentvendors", async (req, res) => {
  try {
    const vendors = await studentVendors.find();
    res.json(vendors);
  } catch (error) {
    console.error("Error fetching vendors idher hi:", error);
    res.status(500).send("Internal Server Error");
  }
});

//same inspiration as above, this one returns all vendors for cross validation
app.get("/vendors", async (req, res) => {
  try {
    const vendors = await Vendors.find();
    res.json(vendors);
  } catch (error) {
    console.error("Error fetching vendors:", error);
    res.status(500).send("Internal Server Error");
  }
});

//same inspiration as above, this one returns all customers for cross validation
app.get("/customers", async (req, res) => {
  try {
    const customers = await Customers.find();
    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).send("Internal Server Error");
  }
});

//same inspiration as above, this one returns all items for cross validation
app.get("/items", async (req, res) => {
  try {
    const items = await Items.find();
    res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).send("Internal Server Error");
  }
});

const CustomerTopVendors = async (req, res) => {
  //Hassan Ali
  console.log(req.body);
  console.log("Top vendors: ");
  try {
    // If email is null or undefined, assign a default value, Used during initial testing
    const items = await Order.find();
    console.log(items);
    let vendorEmails = [];
    items.forEach((item) => {
      vendorEmails.push(item.vendorEmail);
    });
    console.log("printing vendor emails " + vendorEmails);
    const vendors = await Items.find({ vendorEmail: { $in: vendorEmails } });
    console.log(vendors);
    res.json(vendors);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Server error" });
  }
};

app.post("/CustomerTopVendors", CustomerTopVendors);


const CustomerViewCart = async (req, res) => {
  //Hassan Ali
  console.log(req.body);
  // console.log("view cart: ");
  const customerEmail = req.body.customerEmail;
  try {
    // If email is null or undefined, assign a default value, Used during initial testing
    const cartItems = await Carts.find({ customer_email: customerEmail });
    // console.log(cartItems);
    res.json(cartItems);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Server error" });
  }
};

app.post("/CustomerViewCart", CustomerViewCart);


const CustomerCurrentOrder = async (req, res) => {
  //Hassan Ali
  console.log(req.body);
  // console.log("view cart: ");
  const customerEmail = req.body.customerEmail;
  try {
    // If email is null or undefined, assign a default value, Used during initial testing
    const cartItems = await Order.find({ clientEmail: customerEmail, $or: [{ status: "New" },{ status: "In Progress" }] });
    // console.log(cartItems);
    res.json(cartItems);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Server error" });
  }
};

app.post("/CustomerCurrentOrder", CustomerCurrentOrder);

//below three api are of talha tariq

//fetch orders for couriers
app.get("/courierorder", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send("Internal Server Error");
  }
});
// Update order status from courier side, New->InProgress->Completed
app.put("/order/update", async (req, res) => {
  const { orderId, newStatus, delivered_by } = req.body;

  try {
    const order = await Order.findOne({ _id: orderId }).exec();
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = newStatus;
    order.delivered_by = delivered_by;

    await order.save();

    res.status(200).json({
      message: "Order status updated successfully",
      updatedOrder: order,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).send("Internal Server Error");
  }
});
// Fetch item information provided the itemId from courier Page
app.get("/item/:itemId", async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const itemInfo = await Items.findOne({ itemId }).select("itemName image");
    if (!itemInfo) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(itemInfo);
  } catch (error) {
    console.error("Error fetching item information:", error);
    res.status(500).send("Internal Server Error");
  }
});
