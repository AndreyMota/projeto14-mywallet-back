import { Router } from "express";
import { signUp, signIn } from "../controllers/authcController.js";
import { validaBodyAuth, validaSigi } from "../schemas/authSchema.js";

const router = Router();
router.post('/cadastro', validaBodyAuth, signUp);
router.post('/', validaSigi, signIn);

export default router;
