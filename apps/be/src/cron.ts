import { WebClient } from "@slack/web-api";
import axios from "axios";
import { CronJob } from "cron";
import WebSocket from "ws";

const services: Array<{
  name: string;
  url: string;
  type: "http" | "websocket";
  available: boolean;
  webhook: string;
}> = [
  {
    name: "Backend API",
    url: process.env.BACKEND_API_URL ?? "",
    type: "http",
    available: true,
    webhook: "",
  },
];

const systemHealthCheckCron = new CronJob(
  "*/15 * * * *",
  async () => {
    if (process.env.NODE_ENV === "development") {
      return;
    }

    const env = process.env.NODE_ENV ?? "";
    const token = process.env.SLACK_TOKEN ?? "";
    const channel = process.env.SLACK_CHANNEL ?? "";
    const web = new WebClient(token);

    await Promise.all(
      services.map(async (service) => {
        try {
          if (service.type === "http") {
            const response = await axios.get(service.url);

            if (response.status === 200 && service.available === false) {
              if (env === "production") {
                await axios.post(service.webhook, {
                  trigger: "up",
                });
              }

              await web.chat.postMessage({
                channel: channel,
                text: `[${env}]: ${service.name} is now up.`,
              });
              service.available = true;
            }
          } else if (service.type === "websocket") {
            await new Promise((resolve, reject) => {
              const ws = new WebSocket(service.url);

              ws.on("open", async () => {
                if (service.available === false) {
                  if (env === "production") {
                    await axios.post(service.webhook, {
                      trigger: "up",
                    });
                  }

                  await web.chat.postMessage({
                    channel: channel,
                    text: `[${env}]: ${service.name} is now up.`,
                  });
                }
                service.available = true;

                ws.close();
                resolve(true);
              });

              ws.on("error", (error) => {
                reject(
                  new Error(`WebSocket connection error: ${error.message}`),
                );
              });
            });
          }
        } catch (error) {
          if (service.available === true) {
            if (env === "production") {
              await axios.post(service.webhook, {
                trigger: "down",
              });
            }

            await web.chat.postMessage({
              channel: channel,
              text: `[${env}]: ${service.name} is down. Error: ${error}`,
            });

            service.available = false;
          }
        }
      }),
    );
  }, // onTick
  null, // onComplete
  false, // start
);

export const startCronJobs = () => {
  systemHealthCheckCron.start();
};
