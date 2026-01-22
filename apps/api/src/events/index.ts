import { QueueEvents } from "@repo/bullq";
import { redisUrl, transcodingQName } from "../config/constants";
import { prismaClient, Status } from "@repo/db";


export default () => {
    const queueEvents = new QueueEvents(transcodingQName, {
        connection: {
            url: redisUrl
        }
    });

    //Job Failed after max retries( updating db after max retrying for error which are not fatal);
    queueEvents.on("failed", async ({ jobId, failedReason }) => {
        console.log(`JobId - ${jobId} failed completely. Reason: ${failedReason} `);
        await prismaClient.job.update({
            where: { id: jobId },
            data: {
                status: Status.FAILED,
                finishedAt: new Date(),
                errorMessage: failedReason || "Unknown Worker Error"
            }
        });
    });
};