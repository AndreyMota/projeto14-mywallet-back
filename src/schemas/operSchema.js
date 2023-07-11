import Joi from "joi";

const operSchema = Joi.object({
  valor: Joi.number().required(),
  descri: Joi.string().required(),
});

export function validaOper(req, res, next) {
    const { valor, descri } = req.body;
    const { error } = operSchema.validate({ valor, descri });

    if (error) {
        const err = error.details[0].message;
        res.status(422).json({ error: err });
        return;
    }

    next();
}