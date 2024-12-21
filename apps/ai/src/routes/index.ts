import express from "express";
import aiRoutes from "./ai";

const router = express.Router();
router.use("/", aiRoutes);

export default router;
