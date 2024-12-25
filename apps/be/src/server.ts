// Plugins
import cors, { type FastifyCorsOptions } from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import fastifyRateLimit from "@fastify/rate-limit";
import Swagger from "@fastify/swagger";
import SwaggerUI from "@fastify/swagger-ui";

// Fastify
import Fastify, { type FastifyPluginCallback } from "fastify";

export const initApp = async (toRegister: FastifyPluginCallback[]) => {
  const port = 3002;
  if (Number.isNaN(port)) {
    throw new Error(`Invalid port ${port}`);
  }

  const fastify = Fastify({
    logger: true,
  });

  const handleProcessExit = (code: 0 | 1) => {
    fastify.close();

    setTimeout(() => {
      process.exit(code);
    }, 1000).unref();
  };

  process.on("uncaughtException", (error) => {
    console.error(error);
    handleProcessExit(1);
  });

  process.on("unhandledRejection", (reason) => {
    console.error(reason);
    handleProcessExit(1);
  });

  process.on("SIGTERM", (signal) => {
    console.log(signal);
    handleProcessExit(0);
  });

  process.on("SIGINT", (signal) => {
    console.log(signal);
    handleProcessExit(0);
  });

  fastify.addHook("onRequest", (request, reply, done) => {
    reply.header("Access-Control-Allow-Origin", "false");
    done();
  });

  const ALLOWED_ORIGINS = [/^https?:\/\/localhost(:\d+)?$/];

  await fastify.register(cors, {
    origin: (origin, cb) => {
      if (!origin) {
        cb(null, true);
        return;
      }

      if (ALLOWED_ORIGINS.some((or) => or.test(origin))) {
        cb(null, true);
        return;
      }

      cb(new Error("Not allowed"), false);
    },
    methods: ["POST", "PUT", "PATCH", "GET", "DELETE", "OPTIONS"],
    exposedHeaders: ["x-clerk-auth-reason", "x-clerk-auth-message"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "access-control-allow-origin",
    ],
  } satisfies FastifyCorsOptions);

  await fastify.register(fastifyRateLimit, {
    max: 1000,
    timeWindow: 60 * 1000, // 1 minute
  });

  await fastify.register(Swagger, {
    openapi: {
      openapi: "3.1.0",
      info: {
        title: "zyme",
        version: process.env.npm_package_version ?? "0.0.0",
      },
    },
  });

  await fastify.register(SwaggerUI, {
    routePrefix: "/api-docs",
    logo: {
      type: "image/png",
      content: Buffer.from("iVBOR...", "base64"),
      href: "/documentation",
      target: "_blank",
    },
  });

  // const authPlugin = await getAuthPlugin(process.env.AUTH_SERVICE_URL);
  // await fastify.register(authPlugin);

  await fastify.register(fastifyMultipart);

  for (const plugin of toRegister) {
    await fastify.register(plugin);
  }

  await fastify.listen({ port, host: "0.0.0.0" }).catch((err) => {
    fastify.log.error(err);
    process.exit(1);
  });

  return fastify;
};

const routes: FastifyPluginCallback = (instance, _opts, done) => {
  instance.get("/", async (_, reply) => {
    reply.type("application/json").code(200);
    return {
      data: {
        message: "hello",
      },
    };
  });
  done();
};

export const runServer = async () => await initApp([routes]);
