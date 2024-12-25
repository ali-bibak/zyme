import "dotenv/config";
import { startCronJobs } from "./cron";
import { runServer } from "./server.js";

startCronJobs();
runServer();
