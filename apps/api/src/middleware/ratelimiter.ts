import rateLimit from "express-rate-limit";

export const globalLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 500, // 500 requests per minute per IP
    standardHeaders: true,
    legacyHeaders: false,
});


/**
 * Strict limiter for job creation
 */
export const createJobLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // max 5 jobs per minute
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => req.userId || "anonymous"
});