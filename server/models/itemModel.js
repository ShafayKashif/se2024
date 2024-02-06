import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ItemsSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: Buffer,
        required: true
    },
    vendorEmail: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Items = mongoose.model('Items', ItemsSchema);
export default Items;
