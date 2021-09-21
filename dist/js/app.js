"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        return resp.json({ usuario: "admUrna", autorizado: true });
    }
    resp.status(401).end();
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
