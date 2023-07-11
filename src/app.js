import express from "express";
import cors from 'cors';
import router from "./routes/indexRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.use(router);


app.listen(PORT, () => {
    console.log('OUVINDO NA PORTA ' + PORT);
});