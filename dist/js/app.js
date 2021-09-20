"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var porta = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(porta, function () {
    console.log("Servidor rodando na porta " + porta + ".");
});
