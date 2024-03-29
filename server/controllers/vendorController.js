//Shehbaz

import Items from "../models/itemModel.js";
import CustomerReviews from "../models/CustomerReviewModel.js";


const showitems = async (req, res) => {
  //Shehbaz
  console.log(req.body);
  console.log("Showing Items");
  try {
    let { vendorEmail } = req.body;
    // If email is null or undefined, assign a default value, Used during initial testing
    vendorEmail = vendorEmail || "default@email.com";
    console.log(vendorEmail);
    const items = await Items.find({ vendorEmail: vendorEmail });
    console.log(items);
    res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);

    res.status(500).json({ error: "Server error" });
  }
};

const add_item = async (request, response) => {
    //Shehbaz
    if (request.body.type === "add_item") {
      console.log("adding item");
      try {
        let { itemName, category, stock, price, image, vendorEmail, calories } =
          request.body;
        vendorEmail = vendorEmail || "default@email.com";
  
      // Find the maximum itemId in the database
      //Item ID was chosen to be auto incrementing
      const maxItemId = await Items.findOne({}, { itemId: 1 }, { sort: { itemId: -1 } });
  
        let nextItemId = 1;
        if (maxItemId) {
          nextItemId = maxItemId.itemId + 1;
        }
  
        // Create a new item in the database
        const newItem = new Items({
          itemId: nextItemId,
          itemName,
          category,
          stock,
          price,
          image,
          vendorEmail,
          calories,
        });
  
        const savedItem = await newItem.save();
  
        console.log("Item added successfully:", savedItem);
        response.status(200).json({ message: "Item added successfully" });
      } catch (error) {
        console.error("Error adding item:", error);
        response
          .status(500)
          .json({ message: "Failed to add item. Please try again." });
      }
    }
  };
  


const ViewCustomerReviews = async (req, res) => {
    //Shehbaz
    //Simpy check and fetch query from our DB
    console.log("Fetching vendor reviews")
    const vendorEmail = req.body.vendorEmail
    console.log(vendorEmail)
  
    try {
      const reviews = await CustomerReviews.find({ vendor_email: vendorEmail });
      console.log(reviews);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };





  export {showitems,add_item,ViewCustomerReviews};