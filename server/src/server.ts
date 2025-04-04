import express from "express";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import router from "./router";
import sequelize from "./config/db";

// Connect to data base
export async function connectDB() {
  try {
    await sequelize.authenticate();
    sequelize.sync();
    // console.log("Connection has been established successfully.");
  } catch (error) {
    console.log(`Unable to connect to the database`);
  }
}
connectDB();

//Express instance
const server = express();

// Allow connections
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (
      origin === process.env.FRONTEND_URL ||
      "http://localhost:4000/api/products"
    ) {
      callback(null, true);
    } else {
      callback(new Error("CORS Error"));
    }
  },
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
  swaggerUI.setup(swaggerSpec, swaggerUiOptions)
);

export default server;
