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
    var id = votacao.candidatos.length + 1;
    var candidato = new candidato_1.Candidato(id, req.body._nome, req.body._numero);
    votacao.addCandidato(candidato);
    resp.json({ mensagem: "Candidato salvo com sucesso !", status: 200 });
});
app.post("/votacao", function (req, resp) {
    var voto = new voto_1.Voto(req.body.nomeCandidato, req.body.numeroCandidato, req.body.dataVoto);
    votacao.addVoto(voto);
    resp.json({ status: "200", mensagem: "Voto Registrado Com sucesso" });
});
app.get("/votacao", function (req, resp) {
    resp.json(votacao.votos);
});
app.get("/candidatos", function (req, resp) {
    resp.json(votacao.candidatos);
});
app.post("/iniciarvotacao", function (req, resp) {
    var msg = { mensagem: "Votação iniciada com sucesso", isVotacaoIniciada: true };
    votacao.iniciada = true;
    votacao.tipo = req.body.tipo;
    votacao.inicio = req.body.inicio;
    votacao.termino = req.body.termino;
    votacao.terminada = false;
    votacao.isVotacaoCurso = true;
    resp.json(msg);
});
app.get("/statusvotacao", function (req, resp) {
    var msg = { mensagem: "Não existe votação em curso.", isVotacaoCurso: false };
    if (votacao.isVotacaoCurso) {
        msg.mensagem = "Votação em curso";
        msg.isVotacaoCurso = true;
    }
    resp.json(msg);
});
app.get("/cancelarvotacao", function (req, resp) {
    votacao.votos = [], votacao.candidatos = [];
    if (!votacao.iniciada) {
        votacao.terminada = false;
        votacao.isVotacaoCurso = false;
        resp.json({ mensagem: "Nenhuma votação foi iniciada !" });
    }
    else if (!votacao.terminada) {
        votacao.iniciada = true;
        votacao.terminada = true;
        votacao.isVotacaoCurso = false;
        resp.json({ mensagem: "Votação cancelada com sucesso !" });
    }
    else {
        votacao.iniciada = true;
        votacao.terminada = true;
        votacao.isVotacaoCurso = false;
        resp.json({ mensagem: "Votação já foi cancelada anteriormente!" });
    }
});
app.get("/apuracao", function (req, resp) {
    var apuracaoGeral = new apuracaoGeral_1.ApuracaoGeral();
    var votoValido = new apuracao_1.Apuracao("", 0, 0, 0);
    var somaVotosValidos = 0;
    var somaVotosBrancos = 0;
    var somaParcial = 0;
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
        apuracaoGeral.addValidos(votoValido);
        somaParcial += somaVotosValidos;
    }
    for (var i = 0; i < votacao.votos.length; i++) {
        if (votacao.votos[i].nomeCandidato == "Branco") {
            somaVotosBrancos++;
        }
    }
    apuracaoGeral.totalValidos = somaParcial;
    apuracaoGeral.brancos = somaVotosBrancos;
    apuracaoGeral.nulos = votacao.votos.length - (somaParcial + somaVotosBrancos);
    apuracaoGeral.total = votacao.votos.length;
    resp.json(apuracaoGeral);
});
