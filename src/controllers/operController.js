import { db } from "../database.js";

export async function mainOp(req, res) {
    const tipo = req.params.tipo;
    if (tipo != 'entrada' && tipo != 'saida') return res.status(404).send(tipo);
    const { valor, descri } = req.body;


    const { authorization } = req.headers;
    const token = await authorization.replace('Bearer ', '');

    if (!token) return res.status(401).send('sem token' + token);

    const session = await db.collection("sessions").findOne({ "token": token});
    if (!session) return res.status(401).send('sem sessao ' + token + session);

    const user = await db.collection("users").findOne({ 
        _id: session.userId 
    })

    if(user) {
        try {
            const saldo = user.saldo;
            const ops = user.ops;
            const op = {valor: valor, descri: descri, tipo: tipo};
            await db.collection("users").updateOne(
                { _id: session.userId },
                {
                  $push: { ops: op },
                  $inc: { saldo: tipo === 'entrada' ? valor : -valor }
                }
            );
              
        } catch (error) {
            res.status(405).send(error);
            return
        }

        res.sendStatus(200);
    } else {
        res.status(401).send('sem user');
    }
}

export async function goHome(req, res) {
    const { authorization } = req.headers;
    const token = await authorization.replace('Bearer ', '');

    if (!token) return res.status(401).send('sem token' + token);

    const session = await db.collection("sessions").findOne({ "token": token});
    if (!session) return res.status(401).send('sem sessao ' + token + session);

    const user = await db.collection("users").findOne({ 
        _id: session.userId 
    })

    if(user) {
        res.status(200).json(user);
    } else {
        res.status(401).send('sem user');
    }
}