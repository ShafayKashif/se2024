import "../../styles/login.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import lumsBackground from "../../styles/lums_background.png";
import logoImage from "../../styles/logo.png";

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
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      if (response.status === 200 && response.data.token) {
        console.log("Login successful!");
        dispatch({
          type: "LOGIN",
          payload: { role: response.data.role, token: response.data.token },
        });
        localStorage.setItem("jwt_token", response.data.token);
        localStorage.setItem("user_role", response.data.role);
        localStorage.setItem(response.data.role + "Email", email); // Standardizing local storage keys

        navigateBasedOnRole(response.data.role, navigate);
      } else {
        console.error(
          "Login failed:",
          response.data.message || "Unknown error"
        );
        alert("Login failed: " + (response.data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login error: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <div
        className="login-left"
        style={{ backgroundImage: `url(${lumsBackground})` }}
      ></div>
      <div className="login-right">
        <img src={logoImage} alt="Logo" className="login-logo" />
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
        <div className="signup-redirect">
          No account? <a href="/MainSignup">Sign up</a>
        </div>
      </div>
    </div>
  );
};

function navigateBasedOnRole(role, navigate) {
  switch (role) {
    case "student_vendor":
      navigate("/StudentVendorHome");
      break;
    case "vendor":
      navigate("/VendorHome");
      break;
    case "customer":
      navigate("/CustomerHome");
      break;
    case "courier":
      navigate("/CourierHome");
      break;
    case "admin":
      navigate("/AdminHome");
      break;
    default:
      console.log("Role not recognized:", role);
  }
}

export default Login;
