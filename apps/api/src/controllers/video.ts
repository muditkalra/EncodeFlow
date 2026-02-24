import { prismaClient } from "@repo/db";
import { Request, Response } from "express";

// gives all the video entries
export const getAllVideos = async (req: Request, res: Response) => {
    try {
        const allVideos = await prismaClient.video.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
        return res.status(200).json(allVideos);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}