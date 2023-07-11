import Joi from "joi";

const signUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
});

const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
});

export function validaBodyAuth(req, res, next) {
    const { name, email, password } = req.body;
    
    const { error } = signUpSchema.validate({ name, email, password });
    
    if (error) {
        const err = error.details[0].message;
        res.status(422).json({ error: err });
        return;
    }
    
    next();
}

export function validaSigi(req, res, next) {
    const { email, password } = req.body;
    
    const { error } = signInSchema.validate({ email, password });
    
    if (error) {
        const err = error.details[0].message;
        res.status(422).json({ error: err });
        return;
    }
    
    next();
}