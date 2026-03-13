import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";

declare global {
    namespace Express {
        export interface Request {
            userId?: string,
            isAdmin?: boolean
        }
    }
}


interface CustomJwtSessionClaims {
    metadata?: {
        role?: "user" | "admin";
    }
}

export const shouldBeUser = (req: Request, res: Response, next: NextFunction) => {
    const { userId, sessionClaims } = getAuth(req);

    if (!userId) {
        return res.status(401).json({ message: "You are not logged In" });
    }

    const claims = sessionClaims as CustomJwtSessionClaims;
    
    req.isAdmin = claims.metadata?.role == "admin";
    req.userId = userId;
    return next();
}