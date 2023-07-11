import dotenv from "dotenv";
import { MongoClient } from 'mongodb';

dotenv.config();
const api = process.env.DATABASE_URL;
const mongoClient = new MongoClient(api);

try {
    await mongoClient.connect();
    console.log("MongoDB conected");
} catch (err) {
    console.log(err);
}

export const db = mongoClient.db();