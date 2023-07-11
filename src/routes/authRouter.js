import { Router } from "express";
import { signUp, signIn } from "../controllers/authcController.js";
import { validaBodyAuth } from "../schemas/authSchema.js";

const router = Router();
router.post('/cadastro', validaBodyAuth, signUp);
router.post('/', validaBodyAuth, signIn);

export default router;
