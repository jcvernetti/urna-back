import { Voto } from './voto';
import { Votacao } from './votacao';
import * as express from "express";
import { Candidato } from './candidato';
import cors = require("cors");

const app = express();
const porta: number = 8080;

const votacao: Votacao = new Votacao();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())

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
    let candidato: Candidato = new Candidato(req.body.nomeCandidato, req.body.numeroCandidato);
    
    votacao.addCandidato(candidato);

    resp.json({mensagem: "Candidato salvo com sucesso !", status: 200});
})

app.post("/votacao", function (req, resp) {

    let voto : Voto = new Voto(req.body.nomeCandidato, req.body.numeroCandidato, req.body.dataVoto)
    
    votacao.addVoto(voto);

    resp.json({status: "200", mensagem: "Voto Registrado Com sucesso"})
})

app.get("/candidatos", function(req: any, resp: any): void{
    resp.json(votacao.candidatos);
})

app.post("/iniciarvotacao", function(req: any, resp: any): void{
    let msg = {mensagem: "Já existe uma votação em curso", isVotacaoIniciada: false};

    if(!votacao.iniciada){
        votacao.iniciada = true;
        votacao.tipo = req.body.tipo;
        votacao.inicio = req.body.inicio;
        votacao.termino = req.body.termino;
        
        msg.isVotacaoIniciada = true;
        msg.mensagem = "Votação iniciada com sucesso";
    }

    resp.json(msg);
});

app.get("/terminarvotacao", function(req: any, resp: any): void {
    if(!votacao.iniciada){
        resp.json({mensagem: "Nenhuma votação foi iniciada !", isVotacaoEncerrada: false});
    }else if(!votacao.terminada){
        votacao.terminada = true;
        resp.json({mensagem: "Votação terminada com sucesso !", isVotacaoEncerrada: true});
    } else{
        resp.json({mensagem: "Votação já foi encerrada anteriormente!", isVotacaoEncerrada: true});
    }
});