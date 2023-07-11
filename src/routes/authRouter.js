import { Router } from "express";
import { signUp } from "../controllers/authcController.js";
import { validaBodyAuth } from "../schemas/authSchema.js";

const router = Router();
router.post('/cadastro', validaBodyAuth, signUp);

export default router;
