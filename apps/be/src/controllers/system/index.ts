import type { FastifyReply, FastifyRequest } from "fastify";

export const up = async (_request: FastifyRequest, reply: FastifyReply) => {
  reply.type("application/json").code(200);
  return {
    data: {
      message: "up",
    },
  };
};
