import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import router from "./routes/router.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// configure env
dotenv.config();

// database config
connectDB();

// rest object
const app = express();

// middleware enable
app.use(
  cors({
    origin: "https://mern-ecommerce-frontend-gray.vercel.app",
    methods: "GET,PUT,POST,DELETE",
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

// app.use(express.static(path.join(__dirname, "./client/build")));

// routes

app.get("/", (req, res) => {
  res.send("server is working");
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", router);
app.use("/api/v1/product", productRoutes);

// rest api
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// port
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`server is running on mode ${process.env.DEV_MODE} port ${port}`);
});
