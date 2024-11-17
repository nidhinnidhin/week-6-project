const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

require("dotenv").config();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use('/api/admin', adminRoutes);


// Db connection
mongoose
  .connect(
    "mongodb+srv://nidhinbabu171:1921u0030@cluster0.wir2j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Mongodb connected successfully");
  })
  .catch((err) => {
    console.log("Error while connecting mongodb", err.message);
  });

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(9000, () => {
  console.log("The Server started running on port 9000");
});
