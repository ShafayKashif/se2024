import "../../styles/MainSignup.css";
import { useState } from "react";

const MainSignup = (prop) => {
  return (
    <div className="MainSignup-page">
      <h3 className="MainSignup-header"> Signup As: </h3>
      <div className="partition"></div>
      <form className="form">
        <div>
          <button className="sub-button">
            <a href="/VendorSignup">Vendor</a>
          </button>
        </div>
        <div>
          <button className="sub-button">
            <a href="/StudentVendorSignup">Student Vendor</a>
          </button>
        </div>
        <div>
          <button className="sub-button">
            <a href="/CustomerSignup">Customer</a>
          </button>
        </div>
        <div>
          <button className="sub-button">
            {" "}
            <a href="/CourierSignup">Courier man</a>
          </button>
        </div>
      </form>
      <div className="question">
        Already have an account? <a href="/">Login</a>{" "}
      </div>
    </div>
  );
};

export default MainSignup;
