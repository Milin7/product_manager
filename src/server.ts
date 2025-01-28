import express from "express";
import router from "./router";
import sequelize from "./config/db";

// Connect to data base
async function connectDB() {
  try {
    await sequelize.authenticate();
    sequelize.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log(`Unable to connect to the database`, error);
  }
}
connectDB();

//Express instance
const server = express();
//Read form data
server.use(express.json());
//Express routes
server.use("/api/products", router);
export default server;
