import "../styles/CourierSignup.css";
import { useState } from "react";
import axios from 'axios';
import React from 'react';
import {useNavigate} from 'react-router-dom'


const Signup = (props) => {
  const navigate = useNavigate();
    const [name, setName] = useState("");
    const [roll_Number, setrollnumber] = useState("");
    const [email, setEmail] = useState("");
    const [phone_Number, setPhonenumber] = useState("");
    const [password, setPassword] = useState("");
    const [Confirmpassword, setConfirmPassword] = useState("");

    const validEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      return emailRegex.test(email);
    }

    const handleSignup = async (event) => {
      event.preventDefault();
        // Validate user input including user role
        if (!name || !email || !roll_Number || !phone_Number || !password || !Confirmpassword) {
          alert("Please fill in all required fields.");
          return;
        }

        if (!validEmail(email))
        {
          alert("Please enter a valid email!");
          return;
        }

        try {
          const response = await axios.post("http://localhost:3001/", {     
          name,
          email,
          phone_Number,
          password,
          Confirmpassword,
          roll_Number,
          type: "signup",
          usertype: "courier",});
    
          if (response.status === 200) {
            console.log("Signup successful!");
            navigate('/');
          } else {
            console.error("Signup failed:", await response.text());
          }
        } catch (error) {
          console.error("Error during signup:", error.message);
        }
      };
  
    return (
      <div className="signup-page">
        <div className="signup-header">
          COURIER SIGNUP
        </div>
        <div className="partition"></div>
        <form className="form" onSubmit={handleSignup}>
          <div>
            <input
              className="user-inp"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
            <div>
                <input
                className="user-inp"
                type="text"
                placeholder="Rollnumber"
                value={roll_Number}
                onChange={(e) => setrollnumber(e.target.value)}
                />
            </div>
          <div>
            <input
              className="user-inp"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className="user-inp"
              type="text"
              placeholder="phone_Number"
              value={phone_Number}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
          </div>

          <div>
            <input
              className="pass-inp"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              className="pass-inp"
              type="password"
              placeholder="confirm Password"
              value={Confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <button className="sub-button">Signup</button>
          </div>
        </form>
        <div className="question">
          Already have an account? <a href="/">Login</a>
        </div>
      </div>
    );
};
  
  export default Signup;
  