import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/MainSignup.css";

const MainSignup = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone_Number, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [roll_Number, setRollNumber] = useState("");
    const [hostel, setHostel] = useState("");
    const [room_Number, setRoomNumber] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async (event) => {
        event.preventDefault();
        setError("");

        if (!name || !email || !phone_Number || !password || !confirmPassword || (role !== "vendor" && (!roll_Number || !hostel || !room_Number))) {
            setError("Please fill in all fields.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3001/signup", {
                name,
                email,
                phone_Number,
                password,
                roll_Number,
                hostel,
                room_Number,
                usertype: role
            });
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                navigate("/");
            } else {
                setError("Signup failed. Please try again later.");
            }
        } catch (error) {
            setError(error.response?.data?.msg || "An error occurred during signup.");
        }
    };

    return (
        <div className="uniqueSignupPage">
            <h1 className="uniqueSignupHeader">Signup</h1>
            <form onSubmit={handleSignup} className="uniqueForm">
                <select value={role} onChange={(e) => setRole(e.target.value)} className="uniqueUserInput">
                    <option value="">Select Role</option>
                    <option value="customer">Customer</option>
                    <option value="courier">Courier</option>
                    <option value="vendor">Vendor</option>
                    <option value="student_vendor">Student Vendor</option>
                </select>

                {role && (
                    <>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="uniqueUserInput" />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="uniqueUserInput" />
                        <input type="text" placeholder="Phone Number" value={phone_Number} onChange={(e) => setPhoneNumber(e.target.value)} className="uniqueUserInput" />
                        {role !== "vendor" && (
                            <>
                                <input type="text" placeholder="Roll Number" value={roll_Number} onChange={(e) => setRollNumber(e.target.value)} className="uniqueUserInput" />
                                <input type="text" placeholder="Hostel" value={hostel} onChange={(e) => setHostel(e.target.value)} className="uniqueUserInput" />
                                <input type="text" placeholder="Room Number" value={room_Number} onChange={(e) => setRoomNumber(e.target.value)} className="uniqueUserInput" />
                            </>
                        )}
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="uniquePassInput" />
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="uniquePassInput" />
                        {error && <div className="uniqueErrorMessage">{error}</div>}
                        <button type="submit" className="uniqueSubButton">Signup</button>
                    </>
                )}
            </form>
        </div>
    );
};

export default MainSignup;
