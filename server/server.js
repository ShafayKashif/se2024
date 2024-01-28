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

//Make your API calls for every usecase here
app.post('/', async (request, response) => {
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
        response.status(450).json({ isAuthenticated: false });
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
    } catch (error) {
      console.error('Error signing up user:', error);

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
