import express from "express";
import * as dotenv from "dotenv";
import routes from "./routes";
dotenv.config();

const app = express()

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const PORT = process.env.PORT || 3001;


// inicializa o servidor na porta especificada
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));