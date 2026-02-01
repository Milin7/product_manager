import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import routes from "./routes";
import { testConnection } from "./config/db";
import { errorHandler } from "./middleware/error.middleware";
import { corsOptions } from "./config/cors";
import cookieParser from "cookie-parser";

testConnection();
const server = express();
server.use(cors(corsOptions));
server.use(express.json());
server.use(morgan("dev"));
server.use(cookieParser());
server.use("/api", routes);
server.use(
  "/docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec, swaggerUiOptions),
);

server.use(errorHandler);

export default server;
