import "../styles/VendorSignup.css";
import { useState } from "react";


const Signup = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [password, setPassword] = useState("");
    const [Confirmpassword, setConfirmPassword] = useState("");



    const handleSignup = async (event) => {
      event.preventDefault();
        // Validate user input including user role
        if (!name || !email || !phonenumber || !password || !Confirmpassword) {
          alert("Please fill in all required fields.");
          return;
        }
    }
  
    return (
      <div className="signup-page">
        <div className="signup-header">
          VENDOR <span className="lib-name">SIGNUP</span>
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
              placeholder="phonenumber"
              value={phonenumber}
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
  