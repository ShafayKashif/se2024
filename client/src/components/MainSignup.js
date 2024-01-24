import "../styles/MainSignup.css";
import { useState } from "react";


const MainSignup = (prop)=>{

    return (        
        <div className="MainSignup-page">
            <div className="MainSignup-header"> Signup As: </div>
            <div className='partition'></div>
            <form className='form' >
                
               <div>
                <button className="sub-button"><a href="/VendorSignup">Vendor</a></button>
               </div>
               <div>
                <button className="sub-button"><a href="/StudentVendorSignup">Student Vendor</a></button>
               </div>
               <div>
                <button className="sub-button">Customer</button>
               </div>
               <div>
                <button className="sub-button">Delivery man</button>
               </div>
                
            </form>
            <div className="question">Already have an account? <a href="/">Login</a> </div>
        </div>
    )

}

export default MainSignup

