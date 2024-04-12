import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
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


import multer from "multer";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`);
      console.log("Connected to Database");
    });
  })
  .catch((error) => {
    console.log(error);
  });

const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });

//Make your API calls for every usecase here
app.post("/", upload.single("image"), async (request, response) => {
  console.log("Post request received: ", request.body);

<<<<<<< HEAD
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

// GPT to speed up the process

// ********************ADMIN*************************
// **************************************************
app.get("/getInfoForAdminHomePage", async (request, response) => {
  try {
    const orders = await Order.find();

    // Group orders by vendor email and calculate total quantity and sales for each vendor
    const vendorSalesInfo = {};
    orders.forEach(order => {
      if (!vendorSalesInfo[order.vendorEmail]) {
        vendorSalesInfo[order.vendorEmail] = {
          totalItemsSold: 0,
          totalPriceOfItemsSold: 0,
          orderCount: 0  // Initialize order count
        };
      }
      vendorSalesInfo[order.vendorEmail].totalItemsSold += order.quantity;
      vendorSalesInfo[order.vendorEmail].totalPriceOfItemsSold += order.total;
      vendorSalesInfo[order.vendorEmail].orderCount++;  // Increment order count
    });

    // Get email addresses
    const topVendorEmails = Object.keys(vendorSalesInfo);

    // Find vendors in the Vendors collection
    const vendors = await Vendors.find({ email: { $in: topVendorEmails } });

    // Find student vendors in the StudentVendors collection
    const myStudentVendors = await studentVendors.find({ email: { $in: topVendorEmails } });

    // Combine vendors and student vendors into a single array
    const allVendors = [...vendors, ...myStudentVendors];

    // Find items for the vendors
    const items = await Items.find({ vendorEmail: { $in: topVendorEmails } });

    // Calculate price range for each vendor
    const vendorPriceRanges = [];
    for (const vendor of allVendors) {
      const vendorItems = items.filter(item => item.vendorEmail === vendor.email);
      const prices = vendorItems.map(item => item.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      vendorPriceRanges.push({ email: vendor.email, minPrice, maxPrice });
    }

    // Find customer reviews for each vendor
    const customerReviews = await CustomerReview.find();

    // Calculate average rating for each vendor
    const vendorAvgRatings = [];
    for (const vendor of allVendors) {
      const vendorReviews = customerReviews.filter(review => review.vendor_email === vendor.email);
      const totalRatings = vendorReviews.reduce((acc, review) => acc + review.rating, 0);
      const avgRating = totalRatings / vendorReviews.length;
      vendorAvgRatings.push({ email: vendor.email, avgRating });
    }

    // Combine vendors, price ranges, average ratings, and order counts into a single array
    const vendorsInfo = allVendors.map(vendor => {
      const { email, name } = vendor;
      const { minPrice, maxPrice } = vendorPriceRanges.find(item => item.email === email);
      const { avgRating } = vendorAvgRatings.find(item => item.email === email);
      const { orderCount } = vendorSalesInfo[email];
      return { email, name, minPrice, maxPrice, avgRating, orderCount };
    });

    // Get all customer reviews
    const myCustomerReviews = await CustomerReview.find();

    // Send popular vendors' information to the frontend
    response.json({ vendorsInfo, myCustomerReviews });
  } catch (error) {
    console.error("Error fetching popular vendors info:", error);
    response.status(500).send("Internal Server Error");
  }
});

app.post("/view-vendor-ratings", async (request, response) => {
  if (request.body && request.body.type === 'view-vendor-ratings'){
    try{
      const queried_email = request.body.query
      // console.log("Email: ", queried_email)
      const vendorReviews = await CustomerReview.find({ vendor_email: queried_email })
      console.log("REviews: ", vendorReviews)
      response.status(200).json(vendorReviews)
    } catch(err){
      console.error("Error searching for reviews of the vendor:")
      response.status(500).json({ error: "Internal server error" })
    }
  }
});

app.post('/ban-vendor', async (request, response) => {
  if (request.body && request.body.type === 'ban-vendor'){
    try{
      const email_to_ban = request.body.email_to_ban
      const description = request.body.description
      // console.log("Email: ", queried_email)
      
      const vendor = await Vendors.findOne({ email: email_to_ban })
      console.log("Vendor: ", vendor)
      if (!vendor) {
        const student_vendor = await studentVendors.findOne({email: email_to_ban})
        if (!student_vendor){
          return response.status(200).json({ error: "Vendor not found" , valid: false})
        }
        student_vendor.status = "banned" + ":" + description 
        await student_vendor.save()
        await Items.deleteMany({ vendorEmail: email_to_ban });
        await Order.deleteMany({ vendorEmail: email_to_ban });
      }
      else {
        vendor.status = "banned" + ":" + description
        await vendor.save()
        await Items.deleteMany({ vendorEmail: email_to_ban });
        await Order.deleteMany({ vendorEmail: email_to_ban });
      }
      
      return response.status(200).json({ message: "Vendor banned successfully" , valid: true})
    } catch(err){
      console.error("Error banning vendor:")
      response.status(500).json({ error: "Internal server error" })
    }
  }
})

// ping to vendor for ban or unbanned
app.post('/is-vendor-banned', async (request, response) => {
  const requestedEmail = request.body.email;

  let isBanned = false;
  let banDescription = '';

  // Check in Vendors collection
  const vendor = await Vendors.findOne({ email: requestedEmail });
  if (vendor && vendor.status && vendor.status.startsWith('banned')) {
    isBanned = true;
    banDescription = vendor.status.slice(7);
  }

  // Check in studentVendors collection if not found in Vendors
  if (!isBanned) {
    const studentVendor = await studentVendors.findOne({ email: requestedEmail });
    if (studentVendor && studentVendor.status && studentVendor.status.startsWith('banned')) {
      isBanned = true;
      banDescription = studentVendor.status.slice(7);
    }
  }

  // Send response to frontend
  response.json({ isBanned, banDescription });
});

app.get('/view-join-requests', async (request, response) => {
  try {
    const processing_vendors = await Vendors.find({ application: 'processing' });
    const processing_student_vendors = await studentVendors.find({ application: 'processing' });
    const processing_couriers = await Couriers.find({ application: 'processing' });

    let allUsers = [];

    // Add user type to each object and push to allUsers array
    if (processing_vendors) {
      allUsers = allUsers.concat(processing_vendors.map(vendor => ({ ...vendor.toObject(), userType: 'vendor' })));
    }
    if (processing_student_vendors) {
      allUsers = allUsers.concat(processing_student_vendors.map(studentVendor => ({ ...studentVendor.toObject(), userType: 'studentVendor' })));
    }
    if (processing_couriers) {
      allUsers = allUsers.concat(processing_couriers.map(courier => ({ ...courier.toObject(), userType: 'courier' })));
    }

    // console.log("Users: ", allUsers)
    response.status(200).json({ allUsers });
  } catch (err) {
    console.log("Error while generating response:", err);
    response.status(500).json({ error: "Internal server error" });
  }
});

app.post('/application-decision', async (request, response) => {

  const vendor_email = request.body.userEmail
  const decision = request.body.decision
  // console.log("Vendor with email: ", vendor_email, " with decision: ", decision)
  try {
    const vendor = await Vendors.findOne({ email: vendor_email })

    if (vendor) {
      vendor.application = decision
      await vendor.save()
      // console.log("Saved decision")
      // console.log("APplication: ", vendor.application)
    }
    else {
      const student_vendor = await studentVendors.findOne({email: vendor_email})
  
      if (student_vendor) {
        student_vendor.application = decision
        await student_vendor.save()
      }
      else {
        const courier = await Couriers.findOne({email: vendor_email})

        if (courier) {
          courier.application = decision
          await courier.save()
        }
      }
    }
    
  } catch(err) {
    console.log("Error while decision being made")
  }
})

app.post('/is-application-approved', async (request, response) => {
  const requestedEmail = request.body.email
  const requested_user_role = request.body.user_role
  try {
    if (requested_user_role === 'vendor') {
      const vendor = await Vendors.findOne({email: requestedEmail})
      response.status(200).json({decision: vendor.application})
    }
    else if (requested_user_role === 'student_vendor') {
      const student_vendor = await studentVendors.findOne({email: requestedEmail})
      response.status(200).json({decision: student_vendor.application})
    }
    else if (requested_user_role === 'courier') {
      const courier = await Couriers.findOne({email: requestedEmail})
      response.status(200).json({decision: courier.application})
    }
  } catch(err){
    console.log("error")
  }
  
});

// ***************************************************
// ***************************************************

//HASSAN ALI reviews and place order
//below is an "API call" i presume, mostly inspired by the initial login and signup designes we did, i think those were by shehbaz. i just changed the body.type to review and usertype to customer as an identifier (also this if exists because initially, we used the same api.post("/") call and redirected using if conditions) anyways, a pretty self explanatory function, extracts vendor, customer email, rating and comment from request body and saves it in the database and sends 200 status code as a response, if successful (later used to redirect on the front end side)
app.post("/logreview", async (request, response) => {
  if (request.body.type === "review" && request.body.usertype === "customer") {
=======
  if (
    request.body.type === "review" &&
    request.body.usertype === "customer"
  ) {
>>>>>>> parent of 6e193b9d (Merge branch 'Hassan-Ali' of https://github.com/ShafayKashif/se2024 into Hassan-Ali)
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




  if (
    request.body.type === "signup" &&
    request.body.usertype === "customer"
  ) {
    console.log("Signing up as customer");
    try {
      const {
        email,
        roll_Number,
        room_Number,
        hostel,
        name,
        phone_Number,
        password,
      } = request.body;

      const existingUser = await Customers.findOne({ email });

      if (existingUser) {
        console.log("email already exists. Cannot sign up.");
        response.send({ isAuthenticated: false });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Customers({
          email,
          roll_Number,
          room_Number,
          hostel,
          name,
          phone_Number,
          password: hashedPassword,
        });

        const savedUser = await newUser.save();
        //login table redirection code
        let role = "Customer";
        const newUser2 = new Users({
          email,
          password: hashedPassword,
          role,
        });
        const savedUser2 = await newUser2.save();
        console.log("User signed up in customer database:", savedUser);
        console.log("User data stored in users database", savedUser2);
        response.status(200).json({ isAuthenticated: true });
      }
    } catch (error) {
      console.error("Error signing up user:", error);
    }
  }



  if (request.body.type === "login") {
    console.log("logging in");
    try {
      const { email, password } = request.body;

      const existingUser = await Users.findOne({ email });
      console.log(existingUser);

      if (!existingUser) {
        return response.status(404).json({ message: "User doesn't exist" });
      }

      bcrypt.compare(password, existingUser.password, function (err, result) {
        if (err) {
          return response
            .status(402)
            .json({ message: "Invalid credentials" });
        }
        if (result) {
          let role = existingUser.role;
          response.status(200).json({ message: role });
        }
      });

      // if (existingUser.password !== hashedPassword) {
      //   return response.status(402).json({ message: "Invalid credentials" });
      // }
      // let role = existingUser.role;
      // response.status(200).json({ message: role });
    } catch (error) {
      console.error("Error signing up user:", error);
    }
  }
  


  if (
    request.body.type === "signup" &&
    request.body.usertype === "student_vendor"
  ) {
    console.log("Post malone");
    try {
      const {
        email,
        roll_Number,
        room_Number,
        hostel,
        name,
        phone_Number,
        password,
      } = request.body;

      const existingUser = await studentVendors.findOne({ name });

      if (existingUser) {
        console.log("username already exists. Cannot sign up.");
        response.send({ isAuthenticated: false });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new studentVendors({
          email,
          roll_Number,
          room_Number,
          hostel,
          name,
          phone_Number,
          password: hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log("User signed up:", savedUser);
        response.status(200).json({ isAuthenticated: true });
      }
    } catch (error) {
      console.error("Error signing up user:", error);
      response
        .status(500)
        .json({ isAuthenticated: false, error: "Internal server error." });
    }
  }

  //Make your API calls for every usecase here
  app.post("/", async (request, response) => {
    console.log("Post request received: ", request.body);


    if (
      request.body.type === "signup" &&
      request.body.usertype === "student_vendor"
    ) {
      signUpStudentVendor(request, response);
    }

    if (request.body.type === "signup" && request.body.usertype === "vendor") {
      console.log("signing up as vendor");
      try {
        const { email, name, phone_Number, password } = request.body;

        const existingUser = await Vendors.findOne({ email });

        if (existingUser) {
          console.log("email already exists. Cannot sign up.");
          response.send({ isAuthenticated: false });
        } else {
          const hashedPassword = await bcrypt.hash(password, 10);

          const newUser = new Vendors({
            email,
            name,
            phone_Number,
            password: hashedPassword,
          });

          const savedUser = await newUser.save();

          //login table redirection code
          let role = "Vendor";
          const newUser2 = new Users({
            email,
            password: hashedPassword,
            role,
          });
          const savedUser2 = await newUser2.save();
          console.log("User signed up in vendor database:", savedUser);
          console.log("User data stored in users database", savedUser2);

          response.status(200).json({ isAuthenticated: true });
        }
      } catch (error) {
        console.error("Error signing up user:", error);
      }
    }

    if (request.body.type === "signup" && request.body.usertype === "courier") {
      console.log("Signing up as courier man");
      try {
        const { email, roll_Number, name, phone_Number, password } =
          request.body;

        const existingUser = await Couriers.findOne({ email });

        if (existingUser) {
          console.log("email already exists. Cannot sign up.");
          response.send({ isAuthenticated: false });
        } else {
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = new Couriers({
            email,
            roll_Number,
            name,
            phone_Number,
            password: hashedPassword,
          });

          const savedUser = await newUser.save();
          //login table redirection code
          let role = "Courier";
          const newUser2 = new Users({
            email,
            password: hashedPassword,
            role,
          });
          const savedUser2 = await newUser2.save();
          console.log("User signed up in courier database:", savedUser);
          console.log("User data stored in users database", savedUser2);
          response.status(200).json({ isAuthenticated: true });
        }
      } catch (error) {
        console.error("Error signing up user:", error);
      }
    }

    

    if (request.body.type === "add_item") {
      console.log("adding item");
      try {
        const { itemName, category, stock, price, vendorEmail } = request.body;

        // Create a new item in the database
        const newItem = new Items({
          itemName,
          category,
          stock,
          price,
          image: request.file.buffer,
          vendorEmail,
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

    if (request.body.type === "login") {
      console.log("logging in");
      try {
        const { email, password } = request.body;

        const existingUser = await Users.findOne({ email });
        console.log(existingUser);

        if (!existingUser) {
          return response.status(404).json({ message: "User doesn't exist" });
        }

        bcrypt.compare(password, existingUser.password, function (err, result) {
          if (err) {
            return response
              .status(402)
              .json({ message: "Invalid credentials" });
          }
          if (result) {
            let role = existingUser.role;
            response.status(200).json({ message: role });
          }
        });

        // if (existingUser.password !== hashedPassword) {
        //   return response.status(402).json({ message: "Invalid credentials" });
        // }
        // let role = existingUser.role;
        // response.status(200).json({ message: role });
      } catch (error) {
        console.error("Error signing up user:", error);
      }
    }

    if (
      request.body.type === "review" &&
      request.body.usertype === "customer"
    ) {
      console.log("Review of customer received");
      try {
        const { vendor, rating, description } = request.body;

        const newReview = new CustomerReviews({
          vendor,
          rating,
          description,
        });
        const savedReview = await newReview.save();
        console.log("Review submitted:", savedReview);
        response.status(200).json({ isAuthenticated: true });
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    }
  });

  // Create a new router instance
  const router = Router();

  // Define a route for food item search
  router.get("/food-search", async (request, response) => {
    const { q } = request.query;

    try {
      // Perform a text search for food items
      const results = await FoodItems.find({
        $text: { $search: q },
      });

      response.status(200).json(results);
    } catch (error) {
      console.error("Error searching for food items:", error);
      response.status(500).json({ error: "Internal server error" });
    }
  });

  // Mount the router on the app
  app.use("/api", router);
});

// Admin endpoints

// Fetch Vendor Reviews
app.get("/api/admin/see-vendor-reviews", (req, res) => {
  res.json([
    { vendor: "Vendor 1", rating: 5, description: "Great service!" },
    {
      vendor: "Vendor 2",
      rating: 4,
      description: "Good, but room for improvement.",
    },
  ]);
});

// Fetch Vendor Requests
app.get("/api/admin/see-vendor-requests", (req, res) => {
  // Placeholder
  res.json([{ vendorName: "New Vendor Request 1", requestDate: "2024-02-10" }]);
});

// Ban Vendors - Listing for now
app.get("/api/admin/vendors", (req, res) => {
  res.json([
    { name: "Vendor 1", id: "v1" },
    { name: "Vendor 2", id: "v2" },
  ]);
});

// Fetch Courier Requests
app.get("/api/admin/see-courier-requests", (req, res) => {
  // Placeholder
  res.json([
    { courierName: "New Courier Request 1", requestDate: "2024-02-10" },
    // Add more mock
  ]);
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
<<<<<<< HEAD

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
  const customerEmail = req.body.CustomerEmail;
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
app.get('/orders/count/:courierEmail', async (req, res) => {
  const courierEmail = req.params.courierEmail;

  try {
    // Count the number of orders where delivered_by matches the courier's email
    const completedOrdersCount = await Order.countDocuments({ delivered_by: courierEmail, status: 'Completed' });

    res.status(200).json({ completedOrdersCount });
  } catch (error) {
    console.error('Error counting completed orders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get("/courier/earnings/:courierEmail", async (req, res) => {
  const courierEmail = req.params.courierEmail;

  try {
    const totalEarnings = await Order.aggregate([
      {
        $match: {
          delivered_by: courierEmail
        }
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: "$total" }
        }
      }
    ]);

    // If there are no orders for the courier, return 0 earnings
    const earnings = totalEarnings.length > 0 ? totalEarnings[0].totalEarnings : 0;

    res.status(200).json({ earnings });
  } catch (error) {
    console.error("Error fetching total earnings:", error);
    res.status(500).send("Internal Server Error");
  }
});

=======
>>>>>>> parent of 6e193b9d (Merge branch 'Hassan-Ali' of https://github.com/ShafayKashif/se2024 into Hassan-Ali)
