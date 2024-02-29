import "../../styles/login.css";
import { useState } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useAuth();

  const validEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
      const response = await axios.post("http://localhost:3001/login", { email, password });

      if (response.status === 200 && response.data.token) {
        console.log("Login successful!");
        console.log("Received Token:", response.data.token);
        console.log("Received Role:", response.data.role);
        // Dispatch login action with role and token
        dispatch({
          type: 'LOGIN',
          payload: { role: response.data.role, token: response.data.token }
        });

        // Navigate based on user role
        switch (response.data.role) {
          case "Student_Vendor":
            navigate("/StudentVendorHome");
            break;
          case "vendor":
            navigate("/VendorHome");
            break;
          case "Customer":
            navigate("/CustomerHome");
            break;
          case "Courier":
            navigate("/CourierHome");
            break;
          case "Admin":
            navigate("/AdminHome");
            break;
          default:
            console.log("Role not recognized:", response.data.role);
        }
      } else {
        console.error("Login failed:", response.data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-page">
      <h1 className="login-header">CampusCousine</h1>
      <div className="partition"></div>
      <form className="form" onSubmit={handleLogin}>
        <input className="user-inp" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="pass-inp" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="sub-button" type="submit">Login</button>
      </form>
      <div className="question">Don't have an account? <a href="/MainSignup">Signup</a></div>
    </div>
  );
};

export default Login;
