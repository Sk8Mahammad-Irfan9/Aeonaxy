const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const authRoute = require("./router/authRoute");
const connectDb = require("./db/connectDb");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: ["https://aeonaxy-frontend.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// running port
PORT = process.env.PORT || 5000;

// Database connect
connectDb();

// user register
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.json("server is running");
});

app.listen(PORT, () => {
  console.log(PORT);
});
