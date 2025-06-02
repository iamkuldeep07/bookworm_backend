import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./database/db.js";
import { errorMiddleware } from "./middlewares/errorMiddlewares.js";
import authRouter from "./routes/authRouter.js"; 
import bookRouter from "./routes/bookRouter.js";
import borrowRouter from "./routes/borrowRouter.js";
import userRouter from "./routes/userRouter.js";
import fileUpload from "express-fileupload";
import { notifyUsers } from "./services/notifyUsers.js";
import { removeUnverifiedAccounts } from "./services/removeUnverifiedAccounts.js";

export const app = express();

config({ path: "./config/.env" });

// CORS Middleware
app.use(
    cors({
        origin: process.env.FRONTEND_URL, 
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// Cookie Parser
app.use(cookieParser());

// JSON and URL-encoded Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ File Upload Middleware (MAKE SURE IT'S HERE!)
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true, // Ensures the temp folder is created if missing
        limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file limit
    })
);

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/borrow", borrowRouter);
app.use("/api/v1/user", userRouter);

// Connect to Database
notifyUsers();
removeUnverifiedAccounts();
connectDB();

// Error Middleware
app.use(errorMiddleware);

export default app;