import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import Users from "./models/userModel.js";
import studentVendors from "./models/studentVendorModel.js";
import Vendors from "./models/vendorModel.js";
import Customers from "./models/customerModel.js"; // Added import for the customer model

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

// API endpoint for different types of user signups
app.post("/", async (request, response) => {
  console.log("Post request received: ", request.body);

  // Student Vendor Signup
  if (
    request.body.type === "signup" &&
    request.body.usertype === "student_vendor"
  ) {
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
        console.log("Username already exists. Cannot sign up.");
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
    }
  }

  // Vendor Signup
  if (request.body.type === "signup" && request.body.usertype === "vendor") {
    try {
      const { email, name, phone_Number, password } = request.body;

      const existingUser = await Vendors.findOne({ name });

      if (existingUser) {
        console.log("Username already exists. Cannot sign up.");
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
        console.log("User signed up:", savedUser);
        response.status(200).json({ isAuthenticated: true });
      }
    } catch (error) {
      console.error("Error signing up user:", error);
    }
  }

  // Customer Signup
  if (request.body.type === "signup" && request.body.usertype === "customer") {
    try {
      const {
        email,
        roll_number,
        room_number,
        hostel_number,
        name,
        phone_number,
        password,
      } = request.body;

      const existingCustomer = await Customers.findOne({ email });

      if (existingCustomer) {
        console.log("Email already exists. Cannot sign up.");
        return response.status(400).send({ message: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newCustomer = new Customers({
        email,
        roll_number,
        room_number,
        hostel_number,
        name,
        phone_number,
        password: hashedPassword,
      });

      const savedCustomer = await newCustomer.save();
      console.log("Customer signed up:", savedCustomer);
      response.status(200).json({ message: "Signup successful" });
    } catch (error) {
      console.error("Error in customer signup:", error);
      response.status(500).send({ message: "Error in customer signup" });
    }
  }

  // Add other API endpoints as needed
});

// Additional server configurations or route definitions can go here
