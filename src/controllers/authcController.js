import { db } from "../database.js";
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';

export async function signUp(req, res) {
  const { email, password } = req.body;
  
  const existingUser = await db.collection('users').findOne({ email: email });

  if (existingUser) {
    res.status(409).json({ error: "Email already registered" });
    return;
  } else {
    const senhaCrip = bcrypt.hashSync(password, 4);
    db.collection('users').insertOne({ email: email, password: senhaCrip });
    res.status(201).send('success');
  }
}
  
export async function signIn(req, res) {
  const { email, password } = req.body;

  const existingUser = await db.collection('users').findOne({ email: email });

  if (existingUser) {
    const bate = bcrypt.compareSync(password, existingUser.password);
    if (bate) {
      const token = uuid();
      await db.collection("sessions").insertOne({userId: existingUser._id,token});
      res.status(200).json({ token: token})
    } else {
      res.status(401).send('Senha incorreta');
    }
  } else {
    res.status(404).send('Email não cadastrado.');
  }

}