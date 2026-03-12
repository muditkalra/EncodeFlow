import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";

declare global {
    namespace Express {
        export interface Request {
            userId?: string
        }
    }
}

export const shouldBeUser = (req: Request, res: Response, next: NextFunction) => {
    const { userId } = getAuth(req);

    if (!userId) {
        return res.status(401).json({ message: "You are not logged In" });
    }

    req.userId = userId;
    return next();
}