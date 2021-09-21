//import * as express from "express";
const express = require("express")

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());


const porta: number = 8080;
app.listen(porta, function(){
    console.log(`Servidor rodando na porta ${porta}.`);
})

app.post("/login", function (req, resp) {
    
    if (req.body.user == "admUrna" && req.body.pass === 1010) {

        return resp.json({usuario: "admUrna", autorizado: true})
    }
    resp.status(401).end()

})


