import cookieParser from "cookie-parser";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";
import xssClean from "xss-clean";
import config from "./config";
import { errorHandling } from "./middlewares/appMiddleware";
import appRoutes from "./routes/v1/appRoutes";
import authRoutes from "./routes/v1/authRoutes";
import reviewRoutes from "./routes/v1/reviewRoutes";
import tourRoutes from "./routes/v1/tourRoutes";
import userRoutes from "./routes/v1/userRoutes";
import viewRoutes from "./routes/v1/viewRoutes";

const { app, db } = config;
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "To many request, please try again in an hour!"
});
const server = express();

server.use(helmet());
server.use(morgan("dev"));
server.use(express.json({ limit: "10kb" }));
server.use(cookieParser());
server.use(mongoSanitize());
server.use(xssClean());
server.set("view engine", "pug");
server.set("views", path.join(__dirname, "views"));
server.use(express.static(path.join(__dirname, "..", "public")));

// View Routes
server.use("/", viewRoutes);
// Api Routes
server.use("/api", limiter);
server.use("/api/v1", authRoutes);
server.use("/api/v1/users", userRoutes);
server.use("/api/v1/tours", tourRoutes);
server.use("/api/v1/reviews", reviewRoutes);
// App Routes
server.use(appRoutes);
server.use(errorHandling);

mongoose
  .connect(db.mongodbUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("[ NATOURS ] A database connection has been established!");
    return server.listen(app.port);
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log(
      `[ NATOURS ] Server is running on ${app.serverUri}:${app.port}!`
    );
  });
