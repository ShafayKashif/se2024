import mongoose from "mongoose";
const Schema = mongoose.Schema;

// check

const CustomersSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
    },
    roll_number: {
      type: Number,
      required: true,
    },
    room_number: {
      type: Number,
      required: true,
    },
    hostel_number: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone_number: {
      type: Number,
      required: true,
      // Add validation for phone number ??
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

CustomersSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

CustomersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Customers = mongoose.model("Customers", CustomersSchema);
export default Customers;
