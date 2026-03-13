import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import morgan from "morgan";
import queueEventsListeners from "./events";
import { register } from "./metrics";
import routes from "./routes";
import { s3Client } from "./utils";
import { prometheusMiddleware } from "./middleware/prometheus";
import { clerkMiddleware } from "@clerk/express";
import { shouldBeUser } from "./middleware/auth";
import helmet from "helmet";
import { globalLimiter } from "./middleware/ratelimiter";
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.disable('etag');
app.use(globalLimiter);
app.use(prometheusMiddleware);
app.use(clerkMiddleware());

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now()
    });
    return;
});

app.use("/api", shouldBeUser, routes); // routes

app.get("/metrics", async (req: Request, res: Response) => {
    console.log("API: data scraped")
    const metrics = await register.metrics();
    res.set("Content-Type", register.contentType);
    res.end(metrics);
})


const start = () => {
    try {
        app.listen(port, () => {
            console.log(`api-service are running on: http://localhost:${port}`);
            queueEventsListeners();
        })
    } catch (error) {
        s3Client.destroy();
        console.log(error);
        process.exit(1);
    }
};

start();