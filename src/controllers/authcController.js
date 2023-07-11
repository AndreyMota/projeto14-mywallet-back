import { db } from "../database.js";

export async function signUp(req, res) {
  const { email, password } = req.body;
  
  const existingUser = await db.collection('users').findOne({ email: email });

  if (existingUser) {
    res.status(409).json({ error: "Email already registered" });
    return;
  } else {
    db.collection('users').insertOne({ email: email, password: password });
    res.status(201).send('success');
  }
}
  