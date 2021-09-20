import * as express from "express";

const app: any = express();
const porta: number = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(porta, function(){
    console.log(`Servidor rodando na porta ${porta}.`);
})

