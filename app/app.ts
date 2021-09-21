import { Voto } from './voto';
import * as express from "express";
import { Candidato } from './candidato';

const app = express();

app.use(express.urlencoded({extended: false}));
const candidatos: Array<Candidato> = [];
const votacao: Array<Voto> = [];

app.use(express.json());


const porta: number = 8080;
app.listen(porta, function(){
    console.log(`Servidor rodando na porta ${porta}.`);
})

app.post("/login", function (req, resp) {
    
    if (req.body.user == "admUrna" && req.body.pass === 1010) {

        return resp.json({usuario: "admUrna", autorizado: true})
    }
    resp.status(401).end()

})

app.post("/candidatos", function(req: any, resp: any): void{
    let candidato = req.body.candidato;
    candidatos.push(candidato);

    resp.json({mensagem: "Candidato salvo com sucesso !", status: 200});
})

app.post("/votacao", function (req, resp) {

    let voto : Voto = new Voto(req.body.nomeCandidato, req.body.numeroCandidato, req.body.dataVoto)
    
    votacao.push(voto);

    resp.json({status: "200", mensagem: "Voto Registrado Com sucesso"})
})