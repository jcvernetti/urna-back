import { Candidato } from './candidato';
import * as express from "express";

const app: any = express();
const porta: number = 8080;

const candidatos: Array<Candidato> = [];

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(porta, function(){
    console.log(`Servidor rodando na porta ${porta}.`);
})

app.post("/candidatos", function(req: any, resp: any): void{
    let candidato = req.body.candidato;
    candidatos.push(candidato);

    resp.json({mensagem: "Candidato salvo com sucesso !", status: 200});
})