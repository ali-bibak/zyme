import express from "express";

import { qa } from "../controller/ai";

const router = express.Router();
router.get("/", qa);
export default router;
