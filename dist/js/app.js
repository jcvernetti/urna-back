"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apuracaoGeral_1 = require("./apuracaoGeral");
var apuracao_1 = require("./apuracao");
var voto_1 = require("./voto");
var votacao_1 = require("./votacao");
var express = require("express");
var candidato_1 = require("./candidato");
var cors = require("cors");
var app = express();
var porta = 8080;
var votacao = new votacao_1.Votacao();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.listen(porta, function () {
    console.log("Servidor rodando na porta " + porta + ".");
});
app.post("/login", function (req, resp) {
    if (req.body.usuario == "admUrna" && req.body.senha == 1010) {
        return resp.json({ mensagem: "Autorizado", autorizado: true });
    }
    resp.json({ mensagem: "Usuário/Senha Inválidos", autorizado: false });
});
app.post("/candidatos", function (req, resp) {
    var candidato = new candidato_1.Candidato(req.body.nomeCandidato, req.body.numeroCandidato);
    votacao.addCandidato(candidato);
    resp.json({ mensagem: "Candidato salvo com sucesso !", status: 200 });
});
app.post("/votacao", function (req, resp) {
    var voto = new voto_1.Voto(req.body.nomeCandidato, req.body.numeroCandidato, req.body.dataVoto);
    votacao.addVoto(voto);
    resp.json({ status: "200", mensagem: "Voto Registrado Com sucesso" });
});
app.get("/candidatos", function (req, resp) {
    resp.json(votacao.candidatos);
});
app.post("/iniciarvotacao", function (req, resp) {
    var msg = { mensagem: "Já existe uma votação em curso", isVotacaoIniciada: false };
    if (!votacao.iniciada) {
        votacao.iniciada = true;
        votacao.tipo = req.body.tipo;
        votacao.inicio = req.body.inicio;
        votacao.termino = req.body.termino;
        msg.isVotacaoIniciada = true;
        msg.mensagem = "Votação iniciada com sucesso";
    }
    resp.json(msg);
});
app.get("/terminarvotacao", function (req, resp) {
    if (!votacao.iniciada) {
        resp.json({ mensagem: "Nenhuma votação foi iniciada !", isVotacaoEncerrada: false });
    }
    else if (!votacao.terminada) {
        votacao.terminada = true;
        resp.json({ mensagem: "Votação terminada com sucesso !", isVotacaoEncerrada: true });
    }
    else {
        resp.json({ mensagem: "Votação já foi encerrada anteriormente!", isVotacaoEncerrada: true });
    }
});
function loadCandidatoseVotos() {
    votacao.addCandidato(new candidato_1.Candidato("C1", 11));
    votacao.addCandidato(new candidato_1.Candidato("C2", 22));
    votacao.addCandidato(new candidato_1.Candidato("C3", 33));
    var data = new Date();
    votacao.addVoto(new voto_1.Voto("C1", 11, data));
    votacao.addVoto(new voto_1.Voto("C1", 11, data));
    votacao.addVoto(new voto_1.Voto("C1", 11, data));
    votacao.addVoto(new voto_1.Voto("C1", 11, data));
    votacao.addVoto(new voto_1.Voto("C2", 22, data));
    votacao.addVoto(new voto_1.Voto("C2", 22, data));
    votacao.addVoto(new voto_1.Voto("C1", 11, data));
    votacao.addVoto(new voto_1.Voto("C3", 33, data));
    votacao.addVoto(new voto_1.Voto("Branco", 0, data));
    votacao.addVoto(new voto_1.Voto("C1", 11, data));
    votacao.addVoto(new voto_1.Voto("Branco", 0, data));
    votacao.addVoto(new voto_1.Voto("C1", 11, data));
    votacao.addVoto(new voto_1.Voto("C3", 33, data));
    votacao.addVoto(new voto_1.Voto("C3", 33, data));
    votacao.addVoto(new voto_1.Voto("C4", 4, data));
}
app.get("/apuracao", function (req, resp) {
    var apuracaoGeral = new apuracaoGeral_1.ApuracaoGeral();
    var votoValido = new apuracao_1.Apuracao("", 0, 0, 0);
    var somaVotosValidos = 0;
    var somaVotosBrancos = 0;
    var somaParcial = 0;
    loadCandidatoseVotos();
    for (var j = 0; j < votacao.candidatos.length; j++) {
        somaVotosValidos = 0;
        for (var i = 0; i < votacao.votos.length; i++) {
            if (votacao.candidatos[j].nome == votacao.votos[i].nomeCandidato) {
                somaVotosValidos++;
            }
        }
        votoValido = new apuracao_1.Apuracao("", 0, 0, 0);
        votoValido.nome = votacao.candidatos[j].nome;
        votoValido.numero = votacao.candidatos[j].numero;
        votoValido.qtde = somaVotosValidos;
        votoValido.percentual = 100 * somaVotosValidos / votacao.votos.length;
        //votacao.addVotosApurados(votoValido);
        apuracaoGeral.addValidos(votoValido);
        somaParcial += somaVotosValidos;
    }
    for (var i = 0; i < votacao.votos.length; i++) {
        if (votacao.votos[i].nomeCandidato == "Branco") {
            somaVotosBrancos++;
        }
    }
    /* votoValido = new Apuracao("", 0, 0, 0);
    votoValido.nome = "Total parcial";
    votoValido.numero = 0;
    votoValido.qtde = somaParcial;
    votoValido.percentual = 100 * somaParcial/votacao.votos.length;
    //votacao.addVotosApurados(votoValido)
    apuracaoGeral.addValidos(votoValido) */
    apuracaoGeral.totalValidos = somaParcial;
    /* votoValido = new Apuracao("", 0, 0, 0);
    votoValido.nome = "Brancos";
    votoValido.numero = 0;
    votoValido.qtde = somaVotosBrancos;
    votoValido.percentual = 100 * somaVotosBrancos/votacao.votos.length;
    //votacao.addVotosApurados(votoValido)
    apuracaoGeral.addValidos(votoValido) */
    apuracaoGeral.brancos = somaVotosBrancos;
    /* votoValido = new Apuracao("", 0, 0, 0);
    votoValido.nome = "Nulos";
    votoValido.numero = 0;
    votoValido.qtde = votacao.votos.length - (somaParcial + somaVotosBrancos);
    votoValido.percentual = 100 * votoValido.qtde/votacao.votos.length;
    //votacao.addVotosApurados(votoValido)
    apuracaoGeral.addValidos(votoValido) */
    apuracaoGeral.nulos = votacao.votos.length - (somaParcial + somaVotosBrancos);
    /* votoValido = new Apuracao("", 0, 0, 0);
    votoValido.nome = "Total";
    votoValido.numero = 0;
    votoValido.qtde = votacao.votos.length;
    votoValido.percentual = 100.0;
    //votacao.addVotosApurados(votoValido)
    apuracaoGeral.addValidos(votoValido) */
    apuracaoGeral.total = votacao.votos.length;
    resp.json(apuracaoGeral);
});
