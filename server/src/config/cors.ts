import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (process.env.NODE_ENV === "development" && !origin) {
      return callback(null, true);
    }

    const allowedOrigins = [
      process.env.FRONTEND_URL,
      process.env.BACKEND_URL,
    ].filter(Boolean);

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
