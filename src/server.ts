import "reflect-metadata";
import express from 'express';
import "express-async-errors";
import { router } from './routes';
import { specifyError } from "./middlewares/specifyError";

import "./database";

const app = express();

app.use(express.json());
app.use(router);

// app.use(specifyError);

app.listen(3333, () => {
    console.log("Server rodando na porta 3333!")
});