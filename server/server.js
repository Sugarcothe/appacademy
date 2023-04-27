const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(cors())
// middlewres

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// routers
const productRouter = require("./routes/productRouter");
app.use("/api/products", productRouter);
const userRouter = require("./routes/userRouter");
app.use("/api/users", userRouter);

// API ROUTE
app.get("/", (req, res) => {
  res.json({ message: "Hello from api" });
});

// PORT

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
