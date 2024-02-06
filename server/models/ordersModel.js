import mongoose from 'mongoose';
const Schema = mongoose.Schema

const ordersSchema = new Schema({
    client: {
        type: String,
        required: true 
    },
    vendor: {
        type: String,
        required: true
    },
    clientHostel: {
        type: String,
        required: true
    },
    vendorHostel: {
        type: String,
        required: true
    },
},{timestamps: true})

const Order = mongoose.model('Order', ordersSchema);
export default Order;

