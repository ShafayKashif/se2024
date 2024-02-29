import "../styles/CustomerReview.css";
import { useState } from "react";
import axios from 'axios';
import React from 'react';
import {useNavigate} from 'react-router-dom'

const CustomerPlaceOrder = (props) => {
  const navigate = useNavigate();
  const [vendor_email, setVendor] = useState("");
  const [quantity, setQuantity] = useState("");
  const [item_name, setitemname] = useState("");

  const handleAddToCart = async (event) => {
    event.preventDefault();
    if (!vendor_email || !quantity || !item_name) {
      alert("Please fill in all required fields.");
      return;
    }

    const customer_email = window.localStorage.getItem('email');
    console.log("customer_email", customer_email); 
    let vendorname = "";
    let vendorhostel = "";
    let vendorroom = "";
    let customerhostel = "";
    let customerroom = "";
    let customername = "";
    let price;
    let vendorFound = false;

    try {
      const response = await axios.get('http://localhost:3001/studentvendors'); 
      if (response.status === 200) {
        console.log("vendors fetched!");
        const vendors = response.data;
        console.log("vendors", vendors);
        const vendor = vendors.find(vendor => vendor.email == vendor_email);
        console.log("vendor", vendor.email);
        console.log("vendor_email", vendor_email);
        console.log("found the single vendor: ", vendor);
        if (!vendor) {
          alert("Vendor doesnt exist, please reconfirm from \"view menu tab\".");
          return;
        } else {
            vendorname = vendor.name;
            vendorhostel = vendor.hostel;
            vendorroom = vendor.room_Number;
            vendorFound = true;
        }
      } else {
        console.error('Failed to fetch student vendors:', await response.text());

      }
    } catch (error) {
      // alert("Vendor doesnt exist, please reconfirm from \"view menu tab\".");
      console.error('Error fetching student vendors:', error.message);
      // return;
    }

    if (vendorFound == false) {
    try {
      const response = await axios.get('http://localhost:3001/vendors');
        if (response.status === 200) {
          console.log("vendors fetched!");
          const vendors = response.data;
          console.log("vendors", vendors);
          const vendor = vendors.find(vendor => vendor.email === vendor_email);
          console.log("found the single vendor: ", vendor);
          if (!vendor) {
            alert("Vendor doesnt exist, please reconfirm from \"view menu tab\".");
            return;
          } else {
              vendorname = vendor.name;
              vendorhostel = "LUMS";
              vendorroom = "LUMS";
              vendorFound = true;
          }
        } else {
          console.error('Failed to fetch vendors:', await response.text());
        }
    } catch (error) {
      console.error('Error fetching vendors:', error.message);
    }
  }

    if (vendorFound == false) {
      alert("Vendor doesnt exist, please reconfirm from \"view menu tab\".");
      return;
    }



    try {
        const response = await axios.get('http://localhost:3001/customers');
        if (response.status === 200) {
          console.log("customers fetched!");
          const customers = response.data;
          console.log("customers", customers);
          const customer = customers.find(customer => customer.email === customer_email);
          console.log("found the single customer: ", customer);
          if (!customer) {
            alert("Customer doesnt exist, please reconfirm from \"view menu tab\".");
            return;
          } else {
              customername = customer.name;
              customerhostel = customer.hostel;
              customerroom = customer.room_Number;
          }
        } else {
          console.error('Failed to fetch customers:', await response.text());
        }}
    catch (error) {
        console.error('Error fetching customers:', error.message);
    }

    try {
        const response = await axios.get('http://localhost:3001/items');
        if (response.status === 200) {
          console.log("items fetched!");
          const items = response.data;
          console.log("items", items);
          const item = items.find(item => item.itemName == item_name && item.vendorEmail == vendor_email);
          console.log("found the single item: ", item);
          console.log("item_name", item_name);
          console.log("item", item);
          if (!item) {
            alert("Item doesnt exist or item not sold by vendor, please reconfirm from \"view menu tab\".");
            return;
          } else {
                price = item.price;
          }
        } else {
          console.error('Failed to fetch items:', await response.text());
        }}
    catch (error) {
        console.error('Error fetching items:', error.message);
    }
    let total = price * quantity;
    try {
      const response = await axios.post("http://localhost:3001/", {     
        vendor_email,
        customer_email,
        quantity,
        item_name,
        price,
        total,
      type: "placeOrder",
      usertype: "customer",});

      if (response.status === 200) {
        console.log("order logged!");
        navigate('/CustomerHome');
      } else {
        console.error("order log failed:", await response.text());
      }
    } catch (error) {
      console.error("error logging order::", error.message);
    }
  };

  const handleSelfPickup = async (event) => {
    event.preventDefault();
    if (!vendor_email || !quantity || !item_name) {
      alert("Please fill in all required fields.");
      return;
    }

    const customer_email = window.localStorage.getItem('email');
    console.log("customer_email", customer_email); 
    let vendorname = "";
    let vendorhostel = "";
    let vendorroom = "";
    let customerhostel = "";
    let customerroom = "";
    let customername = "";
    let price;
    let vendorFound = false;

    try {
      const response = await axios.get('http://localhost:3001/studentvendors'); 
      if (response.status === 200) {
        console.log("vendors fetched!");
        const vendors = response.data;
        console.log("vendors", vendors);
        const vendor = vendors.find(vendor => vendor.email == vendor_email);
        console.log("vendor", vendor.email);
        console.log("vendor_email", vendor_email);
        console.log("found the single vendor: ", vendor);
        if (!vendor) {
          alert("Vendor doesnt exist, please reconfirm from \"view menu tab\".");
          return;
        } else {
            vendorname = vendor.name;
            vendorhostel = vendor.hostel;
            vendorroom = vendor.room_Number;
            vendorFound = true;
        }
      } else {
        console.error('Failed to fetch student vendors:', await response.text());

      }
    } catch (error) {
      // alert("Vendor doesnt exist, please reconfirm from \"view menu tab\".");
      console.error('Error fetching student vendors:', error.message);
      // return;
    }

    if (vendorFound == false) {
    try {
      const response = await axios.get('http://localhost:3001/vendors');
        if (response.status === 200) {
          console.log("vendors fetched!");
          const vendors = response.data;
          console.log("vendors", vendors);
          const vendor = vendors.find(vendor => vendor.email === vendor_email);
          console.log("found the single vendor: ", vendor);
          if (!vendor) {
            alert("Vendor doesnt exist, please reconfirm from \"view menu tab\".");
            return;
          } else {
              vendorname = vendor.name;
              vendorhostel = "LUMS";
              vendorroom = "LUMS";
              vendorFound = true;
          }
        } else {
          console.error('Failed to fetch vendors:', await response.text());
        }
    } catch (error) {
      console.error('Error fetching vendors:', error.message);
    }
  }

    if (vendorFound == false) {
      alert("Vendor doesnt exist, please reconfirm from \"view menu tab\".");
      return;
    }
    
    try {
        const response = await axios.get('http://localhost:3001/customers');
        if (response.status === 200) {
          console.log("customers fetched!");
          const customers = response.data;
          console.log("customers", customers);
          const customer = customers.find(customer => customer.email === customer_email);
          console.log("found the single customer: ", customer);
          if (!customer) {
            alert("Customer doesnt exist, please reconfirm from \"view menu tab\".");
            return;
          } else {
              customername = customer.name;
              customerhostel = customer.hostel;
              customerroom = customer.room_Number;
          }
        } else {
          console.error('Failed to fetch customers:', await response.text());
        }}
    catch (error) {
        console.error('Error fetching customers:', error.message);
    }

    try {
        const response = await axios.get('http://localhost:3001/items');
        if (response.status === 200) {
          console.log("items fetched!");
          const items = response.data;
          console.log("items", items);
          const item = items.find(item => item.itemName == item_name && item.vendorEmail == vendor_email);
          console.log("found the single item: ", item);
          console.log("item_name", item_name);
          console.log("item", item);
          if (!item) {
            alert("Item doesnt exist or item not sold by vendor, please reconfirm from \"view menu tab\".");
            return;
          }
        }
        else {
          console.error('Failed to fetch items:', await response.text());
        }}
    catch (error) {
        console.error('Error fetching items:', error.message);
    }
    let total = price * quantity;
    let clientAddr = customerroom + ", " + customerhostel;
    let vendorAddr = vendorroom + ", " + vendorhostel;
    try {
      const response = await axios.post("http://localhost:3001/", {     
        vendor_email,
        vendorname,
        customer_email,
        customername,
        quantity,
        item_name,
        clientAddr,
        vendorAddr,
        status: "new",
      type: "selfpickup",
      usertype: "customer",});
      if (response.status === 200) {
        console.log("order logged!");
        navigate('/CustomerHome');
      } else {
        console.error("order log failed:", await response.text());
      }
    }
    catch (error) {
      console.error("error logging order::", error.message);
    }
  }

  const handleDelivery = async (event) => {
    event.preventDefault();
    if (!vendor_email || !quantity || !item_name) {
      alert("Please fill in all required fields.");
      return;
    }

    const customer_email = window.localStorage.getItem('email');
    console.log("customer_email", customer_email); 
    let vendorname = "";
    let vendorhostel = "";
    let vendorroom = "";
    let customerhostel = "";
    let customerroom = "";
    let customername = "";
    let price;

    try {
      const response = await axios.get('http://localhost:3001/vendors'); 
      if (response.status === 200) {
        console.log("vendors fetched!");
        const vendors = response.data;
        console.log("vendors", vendors);
        const vendor = vendors.find(vendor => vendor.email === vendor_email);
        alert("vendor", vendor.email);
        alert("vendor_email", vendor_email);
        console.log("found the single vendor: ", vendor);
        if (!vendor) {
          alert("Vendor doesnt exist, please reconfirm from \"view menu tab\".");
          return;
        } else {
            vendorname = vendor.name;
            vendorhostel = vendor.hostel;
            vendorroom = vendor.room_Number;
        }
      } else {
        console.error('Failed to fetch vendors:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching vendors:', error.message);
    }

    try {
        const response = await axios.get('http://localhost:3001/customers');
        if (response.status === 200) {
          console.log("customers fetched!");
          const customers = response.data;
          console.log("customers", customers);
          const customer = customers.find(customer => customer.email === customer_email);
          console.log("found the single customer: ", customer);
          if (!customer) {
            alert("Customer doesnt exist, please reconfirm from \"view menu tab\".");
            return;
          } else {
              customername = customer.name;
              customerhostel = customer.hostel;
              customerroom = customer.room_Number;
          }
        } else {
          console.error('Failed to fetch customers:', await response.text());
        }}
    catch (error) {
        console.error('Error fetching customers:', error.message);
    }

    try {
        const response = await axios.get('http://localhost:3001/items');
        if (response.status === 200) {
          console.log("items fetched!");
          const items = response.data;
          console.log("items", items);
          const item = items.find(item => item.name === item_name && item.vendor_email === vendor_email);
        //   console.log("found the single item: ", item);
        //   console.log("item_name", item_name);
        //   console.log("item", item);
          if (!item) {
            alert("Item doesnt exist or item not sold by vendor, please reconfirm from \"view menu tab\".");
            return;
          }
        }
        else {
          console.error('Failed to fetch items:', await response.text());
        }}
    catch (error) {
        console.error('Error fetching items:', error.message);
    }
    let total = price * quantity;
    try {
      const response = await axios.post("http://localhost:3001/", {     
        vendor_email,
        customer_email,
        quantity,
        item_name,
        price,
        total,
      type: "placeOrder",
      usertype: "customer",});

      if (response.status === 200) {
        console.log("order logged!");
        navigate('/CustomerHome');
      } else {
        console.error("order log failed:", await response.text());
      }
    }
    catch (error) {
      console.error("error logging order::", error.message);
    }
  }








  return (
    <div className="review">
      <h1 >
        Place order
      </h1>
      <div className="partition"></div>
      <form className="form" onSubmit={handleAddToCart}>
        
        <div>
          <input
            className="user-inp"
            type="text"
            placeholder="Item Name"
            value={item_name}
            onChange={(e) => setitemname(e.target.value)}
          />
        </div>
        <div>
          <input
            className="user-inp"
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div>
          <input
            className="user-inp"
            type="text"
            placeholder="Vendor Email"
            value={vendor_email}
            onChange={(e) => setVendor(e.target.value)}
          />
        </div>
        <div>
          <button className="sub-button" type="submit" onClick={handleAddToCart}>
            Add To Cart
          </button>
          <button className="sub-button" type="submit" onClick={handleSelfPickup}>
            Self Pickup
          </button>
          <button className="sub-button" type="submit" onClick={handleDelivery}>
            Delivery
          </button>
        </div>
      </form>
      <div className="question">
        Go back to <a href="/CustomerHome">Home</a>
      </div>
    </div>
  );
};

export default CustomerPlaceOrder;
