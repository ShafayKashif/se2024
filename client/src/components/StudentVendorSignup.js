import "../styles/StudentVendorSignup.css";
import { useState } from "react";
import axios from 'axios';
import React from 'react';
import {useNavigate} from 'react-router-dom'

const isPasswordStrong = (password) => {
  //at least 8 characters long
  if (password.length < 8) {
    return false;
  }

  //has an uppercase letter
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  // has a lowercase letter
  if (!/[a-z]/.test(password)) {
    return false;
  }

  //has a special character
  if (!/[@#$%^&*!()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
    return false;
  }

  return true;
};






const Signup = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_Number, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirmPassword] = useState("");
  const [roll_Number, setRollNumber] = useState("");
  const [hostel, setHostel] = useState("");
  const [room_Number, setRoomNumber] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  }

  const handleSignup = async (event) => {
    event.preventDefault();

    if (!name || !email || !phone_Number || !password || !Confirmpassword || !roll_Number || !hostel || !room_Number) {
      alert("Please fill in all required fields.");
      return;
    }
    
    if (!validEmail(email))
    {
      alert("Please enter a valid email!");
      return;
    }

    if (password !== Confirmpassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (!isPasswordStrong(password)) {
      setPasswordError("Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, and a special character.");
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
        hostel,
        room_Number,
        type: "signup",
        usertype: "student_vendor",
      });

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
      <h1 className="signup-header">
        STUDENT VENDOR SIGNUP
      </h1>
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
            placeholder="Phonenumber"
            value={phone_Number}
            onChange={(e) => setPhonenumber(e.target.value)}
          />
        </div>
        <div>
          <input
            className="user-inp"
            type="text"
            placeholder="Roll number"
            value={roll_Number}
            onChange={(e) => setRollNumber(e.target.value)}
          />
        </div>
        <div>
          <input
            className="user-inp"
            type="text"
            placeholder="Hostel"
            value={hostel}
            onChange={(e) => setHostel(e.target.value)}
          />
        </div>
        <div>
          <input
            className="user-inp"
            type="text"
            placeholder="Room number"
            value={room_Number}
            onChange={(e) => setRoomNumber(e.target.value)}
          />
        </div>
        <div>
          <input
            className="pass-inp"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
            }}
          />
        </div>
        <div>
          <input
            className="pass-inp"
            type="password"
            placeholder="Confirm Password"
            value={Confirmpassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordError("");
            }}
          />
        </div>
        {passwordError && <div className="error-message">{passwordError}</div>}
        <div>
          <button className="sub-button" type="submit">
            Signup
          </button>
        </div>
      </form>
      <div className="question">
        Already have an account? <a href="/">Login</a>
      </div>
    </div>
  );
};

export default Signup;
