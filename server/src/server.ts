import express from "express";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import router from "./router";
import pool from "./config/db";

// Connect to data base
export async function connectDB() {
  try {
    await pool.connect();
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

connectDB();

//Express instance
const server = express();

// Allow connections
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    const allowedOrigins = [process.env.FRONTEND_URL, process.env.BACKEND_URL];

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  allowedHeaders: ["Content-Type", "Authorization"],
};
server.use(cors(corsOptions));

//Read form data
server.use(express.json());

server.use(morgan("dev"));

//Express routes
server.use("/api/products", router);

//Docs
server.use(
  "/docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec, swaggerUiOptions),
);

export default server;
