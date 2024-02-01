import mongoose from 'mongoose';
const Schema = mongoose.Schema

const CustomerReviewSchema = new Schema({
    description: {
        type: String,
        required: true 
    },
    rating: {
        type: Number,
        required: true
    },
    vendor: {
        type: String,
        required: true
    }
},{timestamps: true})

const CustomerReview = mongoose.model('CustomerReview', CustomerReviewSchema);
export default CustomerReview;

