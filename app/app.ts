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

app.get("/candidatos", function (req: any, resp: any): void {
    resp.json(votacao.candidatos);
})

app.post("/iniciarvotacao", function (req: any, resp: any): void {
    let msg = { mensagem: "Já existe uma votação em curso", isVotacaoIniciada: false };

    if (!votacao.iniciada) {
        votacao.iniciada = true;
        votacao.tipo = req.body._tipo;
        votacao.dtInicio = req.body._dtInicio;
        votacao.timeInicio = req.body._timeInicio;
        votacao.dtFim = req.body._dtFim;
        votacao.timeFim = req.body._timeFim;

        msg.isVotacaoIniciada = true;
        msg.mensagem = "Votação iniciada com sucesso";
    }

    resp.json(msg);
});

app.get("/datainicio", function (req:any, resp: any): void {
    resp.json({dtInicio: votacao.dtInicio, timeInicio: votacao.timeInicio})
})

app.get("/datafim", function (req:any, resp:any): void {
    resp.json({dtFim: votacao.dtFim, timeFim: votacao.timeFim})
})

app.get("/terminarvotacao", function (req: any, resp: any): void {
    if (!votacao.iniciada) {
        resp.json({ mensagem: "Nenhuma votação foi iniciada !", isVotacaoEncerrada: false });
    } else if (!votacao.terminada) {
        votacao.terminada = true;
        resp.json({ mensagem: "Votação terminada com sucesso !", isVotacaoEncerrada: true });
    } else {
        resp.json({ mensagem: "Votação já foi encerrada anteriormente!", isVotacaoEncerrada: true });
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