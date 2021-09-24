import { ApuracaoGeral } from './apuracaoGeral';
import { Apuracao } from './apuracao';
import { Voto } from './voto';
import { Votacao } from './votacao';
import * as express from "express";
import { Candidato } from './candidato';
import cors = require("cors");

const app = express();
const porta: number = 8080;

const votacao: Votacao = new Votacao();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.listen(porta, function () {
    console.log(`Servidor rodando na porta ${porta}.`);
})

app.post("/login", function (req, resp) {

    if (req.body.usuario == "admUrna" && req.body.senha == 1010) {

        return resp.json({ mensagem: "Autorizado", autorizado: true })
    }
    resp.json({ mensagem: "Usuário/Senha Inválidos", autorizado: false })

})

app.post("/candidatos", function(req: any, resp: any): void{
    let id: number = votacao.candidatos.length + 1;
    let candidato: Candidato = new Candidato(id, req.body._nome, req.body._numero);
    
    votacao.addCandidato(candidato);

    resp.json({ mensagem: "Candidato salvo com sucesso !", status: 200 });
})

app.post("/votacao", function (req, resp) {

    let voto: Voto = new Voto(req.body.nomeCandidato, req.body.numeroCandidato, req.body.dataVoto)

    votacao.addVoto(voto);

    resp.json({ status: "200", mensagem: "Voto Registrado Com sucesso" })
})

app.get("/votacao", function (req, resp) {
    resp.json(votacao.votos)
})

app.get("/candidatos", function (req: any, resp: any): void {
    resp.json(votacao.candidatos);
})

app.post("/iniciarvotacao", function (req: any, resp: any): void {
    let msg = { mensagem: "Votação iniciada com sucesso", isVotacaoIniciada: true };

    votacao.iniciada = true;
    votacao.tipo = req.body.tipo;
    votacao.inicio = req.body.inicio;
    votacao.termino = req.body.termino;
    votacao.terminada = false;
    votacao.isVotacaoCurso = true;

    resp.json(msg);
});

app.get("/statusvotacao", function (req: any, resp: any): void {
    let msg = { mensagem: "Não existe votação em curso.", isVotacaoCurso: false};
    
    if(votacao.isVotacaoCurso){
        msg.mensagem = "Votação em curso";
        msg.isVotacaoCurso = true;
    } 
    
    resp.json(msg);
});

app.get("/cancelarvotacao", function (req: any, resp: any): void {
    votacao.votos = [], votacao.candidatos = [];
    if (!votacao.iniciada) {
        votacao.terminada = false;
        votacao.isVotacaoCurso = false;
        resp.json({ mensagem: "Nenhuma votação foi iniciada !"});
    } else if (!votacao.terminada) {
        votacao.iniciada = true;
        votacao.terminada = true;
        votacao.isVotacaoCurso = false;
        resp.json({ mensagem: "Votação cancelada com sucesso !"});
    } else {
        votacao.iniciada = true;
        votacao.terminada = true;
        votacao.isVotacaoCurso = false;
        resp.json({ mensagem: "Votação já foi cancelada anteriormente!"});
    }
});

app.get("/apuracao", function (req: any, resp: any) {
    let apuracaoGeral: ApuracaoGeral = new ApuracaoGeral();
    let votoValido: Apuracao = new Apuracao("", 0, 0, 0);
    let somaVotosValidos: number = 0;
    let somaVotosBrancos: number = 0;
    let somaParcial: number = 0;

    for (let j = 0; j < votacao.candidatos.length; j++) {
        somaVotosValidos = 0;
        for (let i = 0; i < votacao.votos.length; i++) {
            if (votacao.candidatos[j].nome == votacao.votos[i].nomeCandidato) {
                somaVotosValidos++;
            }
        }
        
        votoValido = new Apuracao("", 0, 0, 0);
        votoValido.nome = votacao.candidatos[j].nome;
        votoValido.numero = votacao.candidatos[j].numero;
        votoValido.qtde = somaVotosValidos;
        votoValido.percentual = 100 * somaVotosValidos/votacao.votos.length;

        apuracaoGeral.addValidos(votoValido)
        somaParcial += somaVotosValidos;
    }

    for (let i = 0; i < votacao.votos.length; i++) {
        if (votacao.votos[i].nomeCandidato == "Branco") {
            somaVotosBrancos++;
        }
    }

    apuracaoGeral.totalValidos = somaParcial;
    apuracaoGeral.brancos = somaVotosBrancos;
    apuracaoGeral.nulos = votacao.votos.length - (somaParcial + somaVotosBrancos);
    apuracaoGeral.total = votacao.votos.length;

    resp.json(apuracaoGeral);
})