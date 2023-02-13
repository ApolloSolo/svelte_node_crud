const router = require("express").Router();
const transactionRoutes = require("./transactions");

router.use("/api", transactionRoutes);

module.exports = router;
