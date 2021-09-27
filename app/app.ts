import { ApuracaoGeral } from './apuracaoGeral';
import { Apuracao } from './apuracao';
import { Voto } from './voto';
import { Votacao } from './votacao';
import * as express from "express";
import { Candidato } from './candidato';
import cors = require("cors");
import path = require('path');

const app = express();
const fs = require("fs");

var votacao: Votacao = new Votacao();
const porta: number = 8080;
const arquivoDados = path.join(__dirname, "../dados/dados.json");
const arquivoApuracao = path.join(__dirname, "../dados/apuracao.json");

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(porta, function () {
    if(isArquivoDeDadosVazio(arquivoDados)){
        criarArquivoDedados(arquivoDados);
    }
    
    console.log(`Servidor rodando na porta ${porta}.`);
})

app.post("/login", function (req, resp) {

    if (req.body.usuario == "admUrna" && req.body.senha == 1010) {

        return resp.json({ mensagem: "Autorizado", autorizado: true })
    }
    resp.json({ mensagem: "Usuário/Senha Inválidos", autorizado: false })

})

app.post("/candidatos", function(req: any, resp: any): void{
    let votacao = lerArquivoJSON(arquivoDados);
    let id: number = votacao._candidatos.length == 0 ? 1 : votacao._candidatos[votacao._candidatos.length - 1]._id + 1;
    let candidato: Candidato = new Candidato(id, req.body._nome, req.body._numero);
    
    votacao._candidatos.push(candidato);
    escreverArquivoJSON(arquivoDados, JSON.stringify(votacao));

    resp.json({ mensagem: "Candidato salvo com sucesso !", status: 200 });
});

app.post("/votacao", function (req, resp) {
    let votacao = lerArquivoJSON(arquivoDados);
    let voto: Voto = new Voto(req.body.nomeCandidato, req.body.numeroCandidato, req.body.dataVoto);

    votacao._votos.push(voto);
    escreverArquivoJSON(arquivoDados, JSON.stringify(votacao));

    resp.json({ status: "200", mensagem: "Voto Registrado Com sucesso" })
})

app.get("/votacao", function (req, resp) {
    let dados = lerArquivoJSON(arquivoDados);
    resp.json(dados._votos)
})

app.get("/candidatos", function (req: any, resp: any): void {
    let dados = lerArquivoJSON(arquivoDados);
    resp.json(dados._candidatos);
})

app.post("/iniciarvotacao", function (req: any, resp: any): void {
    let votacao = lerArquivoJSON(arquivoDados);
    let msg = { mensagem: "Votação iniciada com sucesso", isVotacaoIniciada: true };

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

app.get("/statusvotacao", function (req: any, resp: any): void {
    let votacao = lerArquivoJSON(arquivoDados);
    let msg = { mensagem: "Não existe votação em curso.", isVotacaoCurso: false};
    
    if(votacao._isVotacaoCurso){
        msg.mensagem = "Votação em curso";
        msg.isVotacaoCurso = true;
    } 
    
    resp.json(msg);
});

app.get("/cancelarvotacao", function (req: any, resp: any): void {
    criarArquivoDedados(arquivoDados);
});

app.get("/datainicio", function (req:any, resp: any): void {
    let votacao = lerArquivoJSON(arquivoDados);
    resp.json({dtInicio: votacao._dtInicio, timeInicio: votacao._timeInicio})
});

app.get("/datafim", function (req:any, resp:any): void {
    let votacao = lerArquivoJSON(arquivoDados);
    resp.json({dtFim: votacao._dtFim, timeFim: votacao._timeFim})
});

app.get("/infovotacao", function(req: any, resp: any) {
    let votacao = lerArquivoJSON(arquivoDados);
    
    let dados: object = {
        tipoEleicao: votacao._tipoEleicao,
        dtInicio: votacao._dtInicio, 
        timeInicio: votacao._timeInicio,
        dtFim: votacao._dtFim, 
        timeFim: votacao._timeFim
    }

    resp.json(dados)
});

app.delete("/deletarcandidato/:numeroCandidato", function(req, resp): void {
    let votacao = lerArquivoJSON(arquivoDados);
    let numeroCandidato = req.params.numeroCandidato;
    let resposta = {mensagem: "Candidato não encontrado !", isCandidatoDeletado: false}
    
    if(votacao._candidatos == undefined){
        resposta.mensagem = "Lista de candidatos não definida, contate o administrador do sistema.";
    }else if(votacao._candidatos.length == 0){
        resposta.mensagem = "Lista de candidatos vazia !";
    } else {
        let auxArray = votacao._candidatos.slice();
        for (let i = 0; i < votacao._candidatos.length; i++) {
            if(votacao._candidatos[i]._numero == Number(numeroCandidato)) {
                auxArray.splice(i, 1);
                
                resposta.mensagem = "Candidato deletado com sucesso !";
            }
        }

        votacao._candidatos = auxArray.slice();
        escreverArquivoJSON(arquivoDados, JSON.stringify(votacao));
    }

    resp.json(resposta);
});

app.get("/terminarvotacao", function (req: any, resp: any): void {
    let votacao = lerArquivoJSON(arquivoDados);
    if (!votacao._iniciada) {
        votacao._terminada = false;
        votacao._isVotacaoCurso = false;
        resp.json({ mensagem: "Nenhuma votação foi iniciada !"});
    } else if (!votacao.terminada) {
        votacao._iniciada = true;
        votacao._terminada = true;
        votacao._isVotacaoCurso = false;
        resp.json({ mensagem: "Votação cancelada com sucesso !"});
    } else {
        votacao._iniciada = true;
        votacao._terminada = true;
        votacao._isVotacaoCurso = false;
        resp.json({ mensagem: "Votação já foi cancelada anteriormente!"});
    }
});

app.get("/apuracao", function (req: any, resp: any) {
    let votacao = lerArquivoJSON(arquivoDados);

    let apuracaoGeral: ApuracaoGeral = new ApuracaoGeral();
    let votoValido: Apuracao = new Apuracao("", 0, 0, 0);
    let somaVotosValidos: number = 0;
    let somaVotosBrancos: number = 0;
    let somaParcial: number = 0;
    
    for (let j = 0; j < votacao._candidatos.length; j++) {
        somaVotosValidos = 0;
        for (let i = 0; i < votacao._votos.length; i++) {
            if (votacao._candidatos[j]._nome == votacao._votos[i]._nomeCandidato) {
                somaVotosValidos++;
            }
        }
        
        votoValido = new Apuracao("", 0, 0, 0);
        votoValido.nome = votacao._candidatos[j]._nome;
        votoValido.numero = votacao._candidatos[j]._numero;
        votoValido.qtde = somaVotosValidos;
        votoValido.percentual = 100 * somaVotosValidos/votacao._votos.length;

        apuracaoGeral.addValidos(votoValido)
        somaParcial += somaVotosValidos;
    }

    for (let i = 0; i < votacao._votos.length; i++) {
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

function lerArquivoJSON(arquivo: string): any{
    let dados = fs.readFileSync(arquivo, 'utf8');

    return JSON.parse(dados);
}

function escreverArquivoJSON(arquivo: string, dados: string): void {
    fs.writeFileSync(arquivo, dados);
}

function isArquivoDeDadosVazio(arquivo) {
    let dados = lerArquivoJSON(arquivo); 
    
    return Object.keys(dados).length == 0;
}

function criarArquivoDedados(arquivo) {
    let votacao = new Votacao();
    votacao.isVotacaoCurso = false;
    escreverArquivoJSON(arquivo, JSON.stringify(votacao));
}