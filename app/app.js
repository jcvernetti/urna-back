"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var porta = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.listen(porta, function () {
    console.log("Servidor rodando na porta " + porta + ".");
});
app.post("/login", function (req, resp) {
    if (req.body.user == "admUrna" && req.body.pass === 1010) {
        return resp.json({ usuario: "admUrna", autorizado: true });
    }
    resp.status(401).end();
    //nmp i jsonwebtoken
});
