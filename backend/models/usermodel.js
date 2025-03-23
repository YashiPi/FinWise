const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

// mongoose.connect(`mongodb://127.0.0.1:27017/bankingApp`);

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountNumber: {
    // randomly generated at registration
    type: String,
    unique: true,
  },
  balance: {
    type: Number,
    default: 1000,
  },
});

module.exports = mongoose.model("User", userSchema);
