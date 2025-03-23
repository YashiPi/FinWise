const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect(`mongodb://127.0.0.1:27017/bankingApp`);

const transactionSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  fromAccount: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  toAccount: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  amount: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Transaction", transactionSchema);
