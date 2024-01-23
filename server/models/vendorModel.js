import mongoose from 'mongoose';
const Schema = mongoose.Schema

const VendorsSchema = new Schema({
    email: {
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
    },
    confirm_password: {
        type: String,
        required: true
    }
},{timestamps: true})

UsersSchema.methods.comparePassword = function(candidatePassword) {
    // compare hash of the passwords
    return this.password === candidatePassword;
  };


const Vendors = mongoose.model('Vendors', VendorsSchema);
export default Vendors;

