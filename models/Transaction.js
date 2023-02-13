const { Schema, model } = require("mongoose");

const transactionSchema = new Schema({
  value: {
    type: Number,
    required: true,
  },
  date: {
    type: Number,
    default: new Date().getTime(),
  },
});

const Transaction = model("transaction", transactionSchema);

module.exports = Transaction;
