const router = require("express").Router();
const Transaction = require("../models/Transaction");

router.get("/trans", async (req, res) => {
  try {
    const trans = await Transaction.find();
    if (!trans) {
      res.status(200).json({ message: "No Transactions" });
    }
    res.status(200).json(trans);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

router.post("/trans", async (req, res) => {
  try {
    const { value, date } = req.body;
    const newTrans = await Transaction.create({ value, date });
    const trans = await newTrans.save();
    res.status(200).json(trans);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

router.delete("/trans", async (req, res) => {
  try {
    const { id } = req.body;
    const deletedTransact = await Transaction.findByIdAndDelete(id);
    res.status(200).json(deletedTransact);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
