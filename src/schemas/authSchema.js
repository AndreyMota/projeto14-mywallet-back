import Joi from "joi";

const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
});

export function validaBodyAuth(req, res, next) {
    const { email, password } = req.body;
    
    const { error } = signUpSchema.validate({ email, password });
    
    if (error) {
        const err = error.details[0].message;
        res.status(422).json({ error: err });
        return;
    }
    
    next();
}