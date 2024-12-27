import type { FastifyPluginCallback } from "fastify";

// Controller
import { up } from "../controllers/system";

export const systemRoutes: FastifyPluginCallback = (instance, _opts, done) => {
  instance.get(
    "/",
    {
      schema: {
        description: "A simple endpoint returning a status of server",
        tags: ["System"],
        summary: "System Health Check",
      },
    },
    up,
  );
  done();
};
