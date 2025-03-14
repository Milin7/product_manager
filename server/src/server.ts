import express from "express";
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
//Read form data
server.use(express.json());
//Express routes
server.use("/api/products", router);

//Docs
server.use(
  "/docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec, swaggerUiOptions)
);

export default server;
