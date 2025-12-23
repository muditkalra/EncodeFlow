import "dotenv/config.js";
import { Worker } from "bullmq";
import { createClient } from "@repo/s3";


// s3client;
const s3Client = createClient("ap-south-1");


async function processVideo() {

}


// const worker = new Worker("transcoding-q", processVideo, {

// })