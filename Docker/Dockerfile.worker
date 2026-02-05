FROM node:20-slim AS base
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Enable pnpm
RUN corepack enable
# Installing turbo
RUN npm install -g turbo

FROM base AS prune

WORKDIR /repo

COPY . .
RUN turbo prune --scope=worker --docker

FROM base AS deps

WORKDIR /app

# Copying only pruned dependency files
COPY --from=prune /repo/out/json/ ./

RUN pnpm install --frozen-lockfile

FROM deps AS build

# Copying full pruned source, this will merge with files and overwrite if exist in /app dir
COPY --from=prune /repo/out/full/ ./

#prisma client
RUN pnpm run db:generate

#building worker
RUN pnpm build

FROM node:20-slim AS runtime

RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy node_modules from deps
COPY --from=deps /app/node_modules ./node_modules

# Copy built worker + shared packages
COPY --from=build /app/apps/worker/dist ./apps/worker/dist
COPY --from=build /app/apps/worker/package.json ./apps/worker/
COPY --from=build /app/apps/worker/node_modules ./apps/worker/node_modules
COPY --from=build /app/packages ./packages

WORKDIR /app/apps/worker

ENV NODE_ENV=production
CMD ["node", "dist/index.cjs"]