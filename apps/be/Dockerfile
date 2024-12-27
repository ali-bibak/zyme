FROM node:20-alpine3.16 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g pnpm

RUN pnpm -g add turbo

FROM base AS builder
WORKDIR /app

RUN apk update
RUN apk add --no-cache libc6-compat

COPY package.json turbo.json pnpm-workspace.yaml pnpm-lock.yaml /app/
COPY apps/be /app/apps/be/
COPY packages/tsconfig /app/packages/tsconfig/
COPY packages/auth /app/packages/auth/

RUN turbo prune @zyme/be --docker

FROM base AS installer
WORKDIR /app

RUN apk update
RUN apk add --no-cache libc6-compat

COPY --from=builder /app/out/json/ .
RUN pnpm install

# Build the project
COPY --from=builder /app/out/full/ .
RUN pnpm build --filter @zyme/be

FROM base AS runner

# Fix prisma

WORKDIR /app

COPY --from=installer /app/apps/be ./apps/be
