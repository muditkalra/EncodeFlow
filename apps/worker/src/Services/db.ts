import { Status, PrismaClient } from "@repo/db"

export class DBService {
    private prismaClient: PrismaClient;

    constructor(pClient: PrismaClient) {
        this.prismaClient = pClient;
    }

    startTranscoding = async (dbJobId: string) => {
        try {
            await this.prismaClient.job.update({
                where: { id: dbJobId },
                data: {
                    status: Status.PROCESSING,
                    startedAt: new Date(),
                    progress: 1
                }
            })
        } catch (error) {
            throw new Error("failed to notify db");
        }
    }

    updateProgess = async (progress: number, dbJobId: string) => {
        try {
            await this.prismaClient.job.update({
                where: { id: dbJobId },
                data: { progress }
            })
        } catch (error) {
            throw new Error("failed to update progress to db");
        }
    }

    completedTranscoding = async (dbJobId: string, outputSize: number, outputUrl: string) => {
        try {
            await this.prismaClient.job.update({
                where: { id: dbJobId },
                data: {
                    status: Status.COMPLETED,
                    finishedAt: new Date(),
                    progress: 100,
                    outputSize,
                    outputUrl,
                }
            })
        } catch (error) {
            throw new Error("failed to notify db");
        }
    }


    failedJob = async (dbJobId: string, errorMessage: string) => {
        try {
            await this.prismaClient.job.update({
                where: { id: dbJobId },
                data: {
                    status: Status.FAILED,
                    finishedAt: new Date(),
                    errorMessage
                }
            });
        } catch (error) {
            throw new Error("failed to update db");
        }
    }

}