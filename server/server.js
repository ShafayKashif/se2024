import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
import bcrypt from 'bcrypt';
import Users from './models/userModel.js';
import studentVendors from './models/studentVendorModel.js';
import Vendors from './models/vendorModel.js';
import Customers from './models/customerModel.js'
import Couriers from './models/courierModel.js'
import Items from './models/itemModel.js';

<<<<<<< Updated upstream
import multer from 'multer';
=======
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

//controllers
import { showitems , add_item , ViewCustomerReviews, updateStockVendor,getNewOrders,vendorAnalytics} from "./controllers/vendorController.js";
>>>>>>> Stashed changes

dotenv.config();

const app = express();

app.use(express.json())

app.use(cors())
mongoose.connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`)
      console.log("Connected to Database")
    })
  })
  .catch((error) => {
    console.log(error)
  })

  const storage = multer.memoryStorage(); // Store file in memory
  const upload = multer({ storage: storage });

//Make your API calls for every usecase here
app.post('/upload', upload.single('image'), async (request, response) => {
  console.log('Post request received: ', request.body);

  if (request.body.type === 'signup' && request.body.usertype === 'student_vendor') {
    console.log('Signing up as student_Vendor');
    try {
      const { email,
        roll_Number,
        room_Number,
        hostel,
        name,
        phone_Number,
        password, } = request.body;

      const existingUser = await studentVendors.findOne({ email });

      if (existingUser) {
        console.log('email already exists. Cannot sign up.');
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

        //login table redirection code
        let role = "Student_Vendor";
        const newUser2 = new Users({
          email,
          password: hashedPassword,
          role,
        });
        const savedUser2 =  await newUser2.save();
        console.log('User signed up in studentvendor database:', savedUser);
        console.log('User data stored in users database', savedUser2);
        response.status(200).json({ isAuthenticated: true });
        
      }
    } catch (error) {
      console.error('Error signing up user:', error);

    }
  }

  if (request.body.type === 'signup' && request.body.usertype === 'vendor') {
    console.log('signing up as vendor');
    try {
      const {
        email,
        name,
        phone_Number,
        password, } = request.body;

      const existingUser = await Vendors.findOne({ email });

      if (existingUser) {
        console.log('email already exists. Cannot sign up.');
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
          const savedUser2 =  await newUser2.save();
          console.log('User signed up in studentvendor database:', savedUser);
          console.log('User data stored in users database', savedUser2);

        response.status(200).json({ isAuthenticated: true });
      }
    } catch (error) {
      console.error('Error signing up user:', error);

    }
  }

  
  if (request.body.type === 'signup' && request.body.usertype === 'courier') {
    console.log('Signing up as courier man');
    try {
      const { email,
        roll_Number,
        name,
        phone_Number,
        password, } = request.body;

      const existingUser = await Couriers.findOne({ email });

      if (existingUser) {
        console.log('email already exists. Cannot sign up.');
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
          const savedUser2 =  await newUser2.save();
          console.log('User signed up in studentvendor database:', savedUser);
          console.log('User data stored in users database', savedUser2);
        response.status(200).json({ isAuthenticated: true });
      }
    } catch (error) {
      console.error('Error signing up user:', error);

    }
  }


  
  if (request.body.type === 'signup' && request.body.usertype === 'customer') {
    console.log('Signing up as customer');
    try {
      const { email,
        roll_Number,
        room_Number,
        hostel,
        name,
        phone_Number,
        password, } = request.body;

      const existingUser = await Customers.findOne({ email });

      if (existingUser) {
        console.log('email already exists. Cannot sign up.');
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

<<<<<<< Updated upstream
        const savedUser = await newUser.save();
          //login table redirection code
          let role = "Customer";
          const newUser2 = new Users({
            email,
            password: hashedPassword,
            role,
          });
          const savedUser2 =  await newUser2.save();
          console.log('User signed up in studentvendor database:', savedUser);
          console.log('User data stored in users database', savedUser2);
        response.status(200).json({ isAuthenticated: true });
      }
=======
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
app.post("/updateStockVendor",updateStockVendor);
app.post("/getNewOrders",getNewOrders);
app.post("/vendorAnalytics",vendorAnalytics);




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
>>>>>>> Stashed changes
    } catch (error) {
      console.error('Error signing up user:', error);

    }
  }

  if(request.body.type === 'add_item'){
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
  
      console.log('Item added successfully:', savedItem);
      response.status(200).json({ message: 'Item added successfully' });
    } catch (error) {
      console.error('Error adding item:', error);
      response.status(500).json({ message: 'Failed to add item. Please try again.' });
    }
  }
  
  if (request.body.type === 'login') {
    console.log('logging in');
    try {
      const { email,
        password, } = request.body;

      const existingUser = await Users.findOne({ email });
      console.log(existingUser);

      if(!existingUser) {
        return response.status(404).json({ message: "User doesn't exist" });
      }
     
      bcrypt.compare(password, existingUser.password, function(err,result){
        if(err){
          return response.status(402).json({ message: "Invalid credentials" });
        }
        if(result){
          let role = existingUser.role;
          response.status(200).json({ message: role });
        }
      })

      // if (existingUser.password !== hashedPassword) {
      //   return response.status(402).json({ message: "Invalid credentials" });
      // }
      // let role = existingUser.role;
      // response.status(200).json({ message: role });
      

    } catch (error) {
      console.error('Error signing up user:', error);

    }
  }


})
