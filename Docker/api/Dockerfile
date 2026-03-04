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
RUN turbo prune --scope=api --docker

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
COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY --from=build /app/apps/api/package.json ./apps/api/
COPY --from=build /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=build /app/packages ./packages

WORKDIR /app/apps/api

ENV NODE_ENV=production

# PORT
EXPOSE 8000

CMD ["node", "dist/index.cjs"]