import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDb(); // connect to database

const port = process.env.PORT || 5000;
const app = express();

// body parser middlware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
); // Enable CORS

// Middleware to handle invalid routes
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);

// listen for requests
app.listen(port, () => console.log(`Listening on port ${port}...`));
