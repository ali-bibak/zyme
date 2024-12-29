import type { FastifyPluginCallback } from "fastify";

import { getUser } from "src/controllers/user";
import {
  checkSubscriptionStatus,
  createPaymentLink,
  createSubscription,
  handleWebhook,
} from "../controllers/payment";
// Controller
import { config, up } from "../controllers/system";

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

  instance.get(
    "/config",
    {
      schema: {
        description: "Get application config",
        tags: ["System"],
        summary: "Application Config",
      },
    },
    config,
  );

  instance.get(
    "/user",
    {
      schema: {
        description: "Get User Info",
        tags: ["User"],
        summary: "Application Config",
      },
    },
    getUser,
  );
  done();
};

export const paymentWebhookRoutes: FastifyPluginCallback = (
  instance,
  _opts,
  done,
) => {
  instance.addContentTypeParser(
    "application/json",
    { parseAs: "buffer" },
    (req, body, done) => {
      done(null, body);
    },
  );

  instance.post("/webhook", handleWebhook);

  done();
};

export const paymentRoutes: FastifyPluginCallback = (instance, _opts, done) => {
  instance.post("/create-subscription", createSubscription);
  instance.get("/subscription/:customerId/:productId", checkSubscriptionStatus);
  instance.post("/create-payment-link", createPaymentLink);
  done();
};
