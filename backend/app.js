import express from 'express';
import dotenv from 'dotenv';
dotenv.config({path: './config/config.env' });
import cors from 'cors';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRouter.js';
import jobRouter from './routes/jobRouter.js';
import applicationRouter from './routes/applicationRouter.js';
import dbConnect from './database/dbConnection.js';
import { errorMiddleware } from './middleware/error.js';



const app = express();
// Middleware
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

dbConnect();
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);



app.get("/", (req, res) => {
  res.send("this is home page");
});


// Middleware for error handling
app.use(errorMiddleware);
export default  app;