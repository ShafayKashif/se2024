import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
import bcrypt from 'bcrypt';
import Users from './models/userModel.js';

dotenv.config();

const app = express();

app.use(express.json())

app.use(cors())

mongoose.connect(process.env.MONG_URI)
.then(()=>{
    app.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`)
    console.log("Connected to Database")
})})
.catch((error)=>{
    console.log(error)
})

//Make your API calls for every usecase here
app.post('/', async (request, response) => {
    console.log('Post request received: ', request.body);

    if (request.body.type === 'signup') {
        try {
          const { username, password } = request.body;
    
          const existingUser = await Users.findOne({ username });
    
          if (existingUser) {
            console.log('username already exists. Cannot sign up.');
            response.send({ isAuthenticated: false });
          } else {
  
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const newUser = new Users({
              username,
              password: hashedPassword, 
            });
    
            const savedUser = await newUser.save();
            console.log('User signed up:', savedUser);
            response.status(200).json({ isAuthenticated: true });
          }
        } catch (error) {
          console.error('Error signing up user:', error);
          
        }
        }



})
  