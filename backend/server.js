import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connecDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
//configure env
dotenv.config();
//database config
connecDB();
const app = express();
//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
//rest api

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.get("/", (req, res) => {
  res.send("<h1>Welcom to mini mansion</h1>");
});
const PORT = process.env.PORT || 8000;
//run listen
app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} mode  on port ${PORT}`.bgCyan
      .white
  );
});
