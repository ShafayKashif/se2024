import "../../styles/login.css";
import { useState } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
// Import useAuth hook
import { useAuth } from "./AuthContext"; 

const Login = (prop) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Use useAuth hook here
  const { dispatch } = useAuth();

  const validEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!validEmail(email)) {
      alert("Please enter a valid email!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/", {
        email,
        password,
        type: "login",
      });

      if (response.status === 200 && response.data.message) {
        console.log("login successful!");
        
        // TO DO Update the authentication state based on the role
        dispatch({
          type: 'LOGIN',
          payload: { role: response.data.message }
        });

        // Navigate based on the user role
        if (response.data.message === "Student_Vendor") {
          navigate("/StudentVendorHome");
        } else if (response.data.message === "Vendor") {
          navigate("/VendorHome");
        } else if (response.data.message === "Customer") {
          navigate("/CustomerHome"); // Ensures only customers navigate to CustomerHome
        } else if (response.data.message === "Courier") {
          navigate("/CourierHome");
        } else if (response.data.message === "Admin") {
          navigate("/AdminHome");
        } else {
          console.log("Role not recognized:", response.data.message);
        }
      } else {
        console.error("Login failed:", response.data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div className="login-page">
      <h1 className="login-header">CampusCousine</h1>
      <div className="partition"></div>
      <form className="form" onSubmit={handleLogin}>
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
            className="pass-inp"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button className="sub-button" type="submit">
            Login
          </button>
        </div>
      </form>
      <div className="question">
        Don't have an account? <a href="/MainSignup">Signup</a>{" "}
      </div>
    </div>
  );
};

export default Login;
