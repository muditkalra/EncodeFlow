import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import morgan from "morgan";
import queueEventsListeners from "./events";
import { register } from "./metrics";
import routes from "./routes";
import { s3Client } from "./utils";
import { prometheusMiddleware } from "./middleware/prometheus";
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.disable('etag');
app.use(prometheusMiddleware);

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now()
    });
    return;
});

app.use("/api", routes); // routes

app.get("/metrics", async (req: Request, res: Response) => {
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