import { Router } from "express";
import { validaOper } from "../schemas/operSchema.js";
import { mainOp, goHome } from "../controllers/operController.js";

const router = Router();

router.post('/nova-transacao/:tipo', validaOper, mainOp);
router.get('/user', goHome);
export default router;