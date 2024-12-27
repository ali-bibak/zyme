import type { FastifyReply, FastifyRequest } from "fastify";

import { clerkClient, getAuth } from "@clerk/fastify";

// Configs
import { baseConfig } from "src/config";

export const up = async (_request: FastifyRequest, reply: FastifyReply) => {
  reply.type("application/json").code(200);
  return {
    data: {
      message: "up",
    },
  };
};

export const config = async (_request: FastifyRequest, reply: FastifyReply) => {
  const { userId } = getAuth(_request);

  if (!userId) {
    reply.type("application/json").code(403);
    return {
      data: {
        error: "Unauthorized request.",
      },
    };
  }

  const user = userId ? await clerkClient.users.getUser(userId) : null;
  const payload = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.emailAddresses[0].emailAddress,
  };

  reply.type("application/json").code(200);
  return {
    data: {
      message: "Success",
      user: payload,
      config: baseConfig,
    },
  };
};
