import React from "react";

const BanVendors = () => {
  const vendors = ["Vendor 1", "Vendor 2", "Vendor 3"];

  return (
    <div>
      <h1>Ban Vendors</h1>
      <ul>
        {vendors.map((vendor, index) => (
          <li key={index}>{vendor}</li>
        ))}
      </ul>
    </div>
  );
};

export default BanVendors;
