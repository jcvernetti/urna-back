"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var app = express();
var porta = 8080;
var candidatos = [];
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
