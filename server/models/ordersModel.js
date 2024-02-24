import mongoose from 'mongoose';
const Schema = mongoose.Schema

const ordersSchema = new Schema({
    id: {
        type: Number,
        required: false 
    },
    item_id: {
        type: Number,
        required: false 
    },
    client: {
        type: String,
        required: true 
    },
    vendor: {
        type: String,
        required: true
    },
    client_addr: {
        type: String,
        required: true
    },
    vendor_addr: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: false
    },
    status: {
        type: String,
        required: false
    },
    delivered_by: {
        type: String,
        required: false
    },
},{timestamps: true})

const Order = mongoose.model('Order', ordersSchema);
export default Order;
