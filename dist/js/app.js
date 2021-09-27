"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apuracaoGeral_1 = require("./apuracaoGeral");
var apuracao_1 = require("./apuracao");
var voto_1 = require("./voto");
var votacao_1 = require("./votacao");
var express = require("express");
var candidato_1 = require("./candidato");
var cors = require("cors");
var path = require("path");
var app = express();
var fs = require("fs");
var votacao = new votacao_1.Votacao();
var porta = 8080;
var arquivoDados = path.join(__dirname, "../dados/dados.json");
var arquivoApuracao = path.join(__dirname, "../dados/apuracao.json");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.listen(porta, function () {
    if (isArquivoDeDadosVazio(arquivoDados)) {
        criarArquivoDedados(arquivoDados);
    }
    console.log("Servidor rodando na porta " + porta + ".");
});
app.post("/login", function (req, resp) {
    if (req.body.usuario == "admUrna" && req.body.senha == 1010) {
        return resp.json({ mensagem: "Autorizado", autorizado: true });
    }
    resp.json({ mensagem: "Usuário/Senha Inválidos", autorizado: false });
});
app.post("/candidatos", function (req, resp) {
    var votacao = lerArquivoJSON(arquivoDados);
    var id = votacao._candidatos.length == 0 ? 1 : votacao._candidatos[votacao._candidatos.length - 1]._id + 1;
    var candidato = new candidato_1.Candidato(id, req.body._nome, req.body._numero);
    votacao._candidatos.push(candidato);
    escreverArquivoJSON(arquivoDados, JSON.stringify(votacao));
    resp.json({ mensagem: "Candidato salvo com sucesso !", status: 200 });
});
app.post("/votacao", function (req, resp) {
    var votacao = lerArquivoJSON(arquivoDados);
    var voto = new voto_1.Voto(req.body.nomeCandidato, req.body.numeroCandidato, req.body.dataVoto);
    votacao._votos.push(voto);
    escreverArquivoJSON(arquivoDados, JSON.stringify(votacao));
    resp.json({ status: "200", mensagem: "Voto Registrado Com sucesso" });
});
app.get("/votacao", function (req, resp) {
    var dados = lerArquivoJSON(arquivoDados);
    resp.json(dados._votos);
});
app.get("/candidatos", function (req, resp) {
    var dados = lerArquivoJSON(arquivoDados);
    resp.json(dados._candidatos);
});
app.post("/iniciarvotacao", function (req, resp) {
    var votacao = lerArquivoJSON(arquivoDados);
    var msg = { mensagem: "Votação iniciada com sucesso", isVotacaoIniciada: true };
    votacao._iniciada = true;
    votacao._tipoEleicao = req.body._tipoEleicao;
    votacao._dtInicio = req.body._dtInicio;
    votacao._timeInicio = req.body._timeInicio;
    votacao._dtFim = req.body._dtFim;
    votacao._timeFim = req.body._timeFim;
    votacao._isVotacaoCurso = true;
    votacao._votos = [];
    escreverArquivoJSON(arquivoDados, JSON.stringify(votacao));
    resp.json(msg);
});
app.get("/statusvotacao", function (req, resp) {
    var votacao = lerArquivoJSON(arquivoDados);
    var msg = { mensagem: "Não existe votação em curso.", isVotacaoCurso: false };
    if (votacao._isVotacaoCurso) {
        msg.mensagem = "Votação em curso";
        msg.isVotacaoCurso = true;
    }
    resp.json(msg);
});
app.get("/cancelarvotacao", function (req, resp) {
    criarArquivoDedados(arquivoDados);
});
app.get("/datainicio", function (req, resp) {
    var votacao = lerArquivoJSON(arquivoDados);
    resp.json({ dtInicio: votacao._dtInicio, timeInicio: votacao._timeInicio });
});
app.get("/datafim", function (req, resp) {
    var votacao = lerArquivoJSON(arquivoDados);
    resp.json({ dtFim: votacao._dtFim, timeFim: votacao._timeFim });
});
app.get("/infovotacao", function (req, resp) {
    var votacao = lerArquivoJSON(arquivoDados);
    var dados = {
        tipoEleicao: votacao._tipoEleicao,
        dtInicio: votacao._dtInicio,
        timeInicio: votacao._timeInicio,
        dtFim: votacao._dtFim,
        timeFim: votacao._timeFim
    };
    resp.json(dados);
});
app.delete("/deletarcandidato/:numeroCandidato", function (req, resp) {
    var votacao = lerArquivoJSON(arquivoDados);
    var numeroCandidato = req.params.numeroCandidato;
    var resposta = { mensagem: "Candidato não encontrado !", isCandidatoDeletado: false };
    if (votacao._candidatos == undefined) {
        resposta.mensagem = "Lista de candidatos não definida, contate o administrador do sistema.";
    }
    else if (votacao._candidatos.length == 0) {
        resposta.mensagem = "Lista de candidatos vazia !";
    }
    else {
        var auxArray = votacao._candidatos.slice();
        for (var i = 0; i < votacao._candidatos.length; i++) {
            if (votacao._candidatos[i]._numero == Number(numeroCandidato)) {
                auxArray.splice(i, 1);
                resposta.mensagem = "Candidato deletado com sucesso !";
            }
        }
        votacao._candidatos = auxArray.slice();
        escreverArquivoJSON(arquivoDados, JSON.stringify(votacao));
    }
    resp.json(resposta);
});
app.get("/terminarvotacao", function (req, resp) {
    var votacao = lerArquivoJSON(arquivoDados);
    if (!votacao._iniciada) {
        votacao._terminada = false;
        votacao._isVotacaoCurso = false;
        resp.json({ mensagem: "Nenhuma votação foi iniciada !" });
    }
    else if (!votacao.terminada) {
        votacao._iniciada = true;
        votacao._terminada = true;
        votacao._isVotacaoCurso = false;
        resp.json({ mensagem: "Votação cancelada com sucesso !" });
    }
    else {
        votacao._iniciada = true;
        votacao._terminada = true;
        votacao._isVotacaoCurso = false;
        resp.json({ mensagem: "Votação já foi cancelada anteriormente!" });
    }
});
app.get("/apuracao", function (req, resp) {
    var votacao = lerArquivoJSON(arquivoDados);
    var apuracaoGeral = new apuracaoGeral_1.ApuracaoGeral();
    var votoValido = new apuracao_1.Apuracao("", 0, 0, 0);
    var somaVotosValidos = 0;
    var somaVotosBrancos = 0;
    var somaParcial = 0;
    for (var j = 0; j < votacao._candidatos.length; j++) {
        somaVotosValidos = 0;
        for (var i = 0; i < votacao._votos.length; i++) {
            if (votacao._candidatos[j]._nome == votacao._votos[i]._nomeCandidato) {
                somaVotosValidos++;
            }
        }
        votoValido = new apuracao_1.Apuracao("", 0, 0, 0);
        votoValido.nome = votacao._candidatos[j]._nome;
        votoValido.numero = votacao._candidatos[j]._numero;
        votoValido.qtde = somaVotosValidos;
        votoValido.percentual = 100 * somaVotosValidos / votacao._votos.length;
        apuracaoGeral.addValidos(votoValido);
        somaParcial += somaVotosValidos;
    }
    for (var i = 0; i < votacao._votos.length; i++) {
        if (votacao._votos[i]._nomeCandidato == "Branco") {
            somaVotosBrancos++;
        }
    }
    apuracaoGeral.totalValidos = somaParcial;
    apuracaoGeral.brancos = somaVotosBrancos;
    apuracaoGeral.nulos = votacao._votos.length - (somaParcial + somaVotosBrancos);
    apuracaoGeral.total = votacao._votos.length;
    escreverArquivoJSON(arquivoApuracao, JSON.stringify(apuracaoGeral));
    resp.json(apuracaoGeral);
});
function lerArquivoJSON(arquivo) {
    var dados = fs.readFileSync(arquivo, 'utf8');
    return JSON.parse(dados);
}
function escreverArquivoJSON(arquivo, dados) {
    fs.writeFileSync(arquivo, dados);
}
function isArquivoDeDadosVazio(arquivo) {
    var dados = lerArquivoJSON(arquivo);
    return Object.keys(dados).length == 0;
}
function criarArquivoDedados(arquivo) {
    var votacao = new votacao_1.Votacao();
    votacao.isVotacaoCurso = false;
    escreverArquivoJSON(arquivo, JSON.stringify(votacao));
}
