import { Router } from "express";
import authRouter from "./authRouter.js";
import operRouter from './operRouter.js';

const router = Router();
router.use(authRouter);
router.use(operRouter);

export default router;