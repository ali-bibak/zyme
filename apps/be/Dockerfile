FROM node:20-alpine3.16 as base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g pnpm@latest
RUN pnpm -g add turbo@^1



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

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN pnpm install

# Build the project
COPY --from=builder /app/out/full/ .
RUN pnpm build --filter @zyme/be



FROM base AS runner
# Copy stuff for prisma to work
COPY --from=installer /app/node_modules/.pnpm/@prisma+client@5.15.1_prisma@5.15.1/node_modules/.prisma/ ./node_modules/.pnpm/@prisma+client@5.15.1_prisma@5.15.1/node_modules/.prisma/

WORKDIR /app
COPY --from=installer /app/apps/be ./apps/be
COPY --from=installer /app/packages/database ./packages/database

CMD cd packages/database && pnpm dlx prisma@latest migrate deploy && cd - && node apps/be/build/index.js

