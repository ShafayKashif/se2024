import mongoose from 'mongoose';
const Schema = mongoose.Schema

const couriersSchema = new Schema({
    email: {
        type: String,
        required: true 
    },
    roll_number: {
        type: Number,
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


const Couriers = mongoose.model('Couriers', couriersSchema);
export default Couriers;

