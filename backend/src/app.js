const express = require("express");
const uploadRoutes = require("./routes/uploadRoutes");
const aiRoutes = require("./routes/aiRoutes");
cors = require("cors");
  
const app = express();
require("dotenv").config();

app.use(express.json());
corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/", uploadRoutes);
app.use("/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("GST AI Agent Running");
});

module.exports = app;

