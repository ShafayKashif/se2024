import "../styles/CustomerSignup.css"; // Adjust the path if needed
import { useState } from "react";
import axios from "axios";

const CustomerSignup = () => {
  const [email, setEmail] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [hostelNumber, setHostelNumber] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();
    if (
      !email ||
      !rollNumber ||
      !roomNumber ||
      !hostelNumber ||
      !name ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Optional: Add additional validation (e.g., password matching)

    try {
      const response = await axios.post("http://localhost:3001/", {
        email,
        rollNumber,
        roomNumber,
        hostelNumber,
        name,
        phoneNumber,
        password,
        confirmPassword,
        type: "signup",
        usertype: "customer",
      });

      if (response.data.message) {
        console.log("Signup successful!", response.data.message);
      } else {
        console.error("Signup failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-header">
        CUSTOMER <span className="lib-name">SIGNUP</span>
      </div>
      <div className="partition"></div>
      <form className="form" onSubmit={handleSignup}>
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
            placeholder="Roll Number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
          />
        </div>
        <div>
          <input
            className="user-inp"
            type="text"
            placeholder="Room Number"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          />
        </div>
        <div>
          <input
            className="user-inp"
            type="text"
            placeholder="Hostel Number"
            value={hostelNumber}
            onChange={(e) => setHostelNumber(e.target.value)}
          />
        </div>
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
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
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

export default CustomerSignup;
