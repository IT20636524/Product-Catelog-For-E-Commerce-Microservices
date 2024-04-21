const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const userRouter = require("./routes/userRoutes");
app.use("/api/user", userRouter);

const productRouter = require("./routes/productRoutes");
app.use("/api/product", productRouter);

const reviewRouter = require("./routes/reviewRoutes");
app.use("/api/review", reviewRouter);

app.get("/",(req, res)=>{
  res.status(200).json({message: "Everything is good here 🙌"});
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Backend is running on port ${PORT}`)
});