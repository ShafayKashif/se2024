import mongoose from 'mongoose';
const Schema = mongoose.Schema

const studentVendorsSchema = new Schema({
    email: {
        type: String,
        required: true 
    },
    roll_number: {
        type: Number,
        required: true
    },
    room_number: {
        type: Number,
        required: true
    },
    hostel_number: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{timestamps: true})

UsersSchema.methods.comparePassword = function(candidatePassword) {
    // compare hash of the passwords
    return this.password === candidatePassword;
  };


const studentVendors = mongoose.model('StudentVendors', studentVendorsSchema);
export default studentVendors;

