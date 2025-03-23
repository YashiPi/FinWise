const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/check_balance", authMiddleware, async (req, res) => {
  const user = await User.findOne({ userId: req.user.userId });

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ balance: user.balance });
});

// transfer money
router.post("/transfer_money", authMiddleware, async (req, res) => {
  const { toAccount, amount } = req.body;
  const fromAccount = req.user.accountNumber; // Auto-detect sender

  if (!toAccount || !amount)
    return res.status(400).json({ message: "Account & amount required." });

  const sender = await User.findOne({ accountNumber: fromAccount });
  const receiver = await User.findOne({ accountNumber: toAccount });

  if (!receiver)
    return res.status(404).json({ message: "Recipient not found." });
  if (sender.balance < amount)
    return res.status(400).json({ message: "Insufficient balance." });

  sender.balance -= amount;
  receiver.balance += amount;

  await sender.save();
  await receiver.save();

  await Transaction.create({
    fromAccount,
    toAccount,
    amount,
  });

  // await Transaction.create({
  //   fromAccount: toAccount,
  //   toAccount: fromAccount,
  //   amount,
  //   type: "credit"
  // });

  res.json({ message: "Transfer successful", newBalance: sender.balance });
});

module.exports = router;
