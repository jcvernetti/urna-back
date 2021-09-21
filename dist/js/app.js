"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var votacao_1 = require("./votacao");
var express = require("express");
var cors = require("cors");
var app = express();
var porta = 8080;
var candidatos = [], votacao = new votacao_1.Votacao();
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
    var candidato = req.body.candidato;
    candidatos.push(candidato);
    resp.json({ mensagem: "Candidato salvo com sucesso !", status: 200 });
});
app.get("/candidatos", function (req, resp) {
    resp.json({ "candidatos": candidatos });
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
