import "dotenv/config.js"
import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'


const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
})

const globalForPrisma = globalThis as unknown as {
    prisma?: PrismaClient
}

const prismaClientSingleton = () => {
    return new PrismaClient({ adapter });
};

export const prismaClient = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaClient;
