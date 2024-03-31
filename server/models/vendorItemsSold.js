import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//Need to include a table that keeps track of item purchased from each vendor so that we can display the top selling vendors on the homepage, this table should have vendor name, email, total items sold, total price of items sold
const vendorItemsSold = new Schema({
    vendorEmail: {
        type: String,
        required: true
    },
    vendorName: {
        type: String,
        required: false
    },
    totalItemsSold: {
        type: Number, 
        required: true
    },
    totalPriceOfItemsSold: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const VendorItemsSold = mongoose.model('VendorItemsSold', vendorItemsSold);
export default VendorItemsSold;
