import * as express from "express";
import { Candidato } from './candidato';
import cors = require("cors");

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(cors())
const candidatos: Array<Candidato> = [];

app.use(express.json());


const porta: number = 8080;
app.listen(porta, function(){
    console.log(`Servidor rodando na porta ${porta}.`);
})

app.post("/login", function (req, resp) {
    
    if (req.body.usuario == "admUrna" && req.body.senha == 1010) {

        return resp.json({usuario: "admUrna", autorizado: true})
    }
    resp.status(401).end()

})

app.post("/candidatos", function(req: any, resp: any): void{
    let candidato = req.body.candidato;
    candidatos.push(candidato);

    resp.json({mensagem: "Candidato salvo com sucesso !", status: 200});
})
