import mongoose from 'mongoose';
const Schema = mongoose.Schema

const CustomerReviewSchema = new Schema({
    id: {
        type: Number,
        required: false
    },
    customer_email: {
        type: String,
        required: false
    },
    vendor_email: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    comment: {
        type: String,
        required: false
    }
},{timestamps: true})

const CustomerReview = mongoose.model('CustomerReview', CustomerReviewSchema);
export default CustomerReview;

