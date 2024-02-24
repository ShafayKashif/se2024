import mongoose from 'mongoose';
const Schema = mongoose.Schema

const cartsSchema = new Schema({
    cart_id: {
        type: Number,
        required: false 
    },
    customer_email: {
        type: String,
        required: true
    },
},{timestamps: true})

const carts = mongoose.model('carts', cartsSchema);
export default carts;

