//import * as express from "express";
var express = require("express");
var app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
var porta = 8080;
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
