const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT, MONGODB_URI } = require("./config");
const cors = require("cors");
const path = require("path");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(() => console.log("MongoDB connetion error"));

app.use(require("./routes/index"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/src"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "src", "app.html"));
  });
}

app.listen(PORT, () => {
  console.log("Listining on port: " + PORT);
});
