const express = require("express");
const uploadRoutes = require("./routes/uploadRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();
require("dotenv").config();

app.use(express.json());

app.use("/", uploadRoutes);
app.use("/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("GST AI Agent Running");
});

module.exports = app;

