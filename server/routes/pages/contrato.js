const fs = require('fs');
const express = require('express');
const router = express.Router();
const helperContrato = require('../../controller/contrato/helpers/helpercontrato');
const convertHTMLToPDF = require("pdf-puppeteer");
const request = require('request');

router.get('/contrato/:unidade?/:matricula?', function (req, res) {

    let unidade = req.params.unidade
        , matricula = req.params.matricula
        ;

    request('http://localhost:3000/contrato/read/aluno/' + matricula,

        function (error, response, body) {

            if (!error && response.statusCode == 200) {

                let objContratante = JSON.parse(body)[0];

                var contratante = {

                    aluno: {
                        nome: objContratante.nomeAluno,
                        rg: objContratante.rgAluno,
                        cpf: objContratante.cpfAluno,
                        matricula: objContratante.matriculaAluno,
                        curso: objContratante.cursoAluno,
                        email: objContratante.emailAluno,
                        telefone: {
                            residencial: objContratante.telefoneAluno,
                            comercial: objContratante.telefoneComercialAluno,
                            ramal: objContratante.ramalAluno
                        },
                        endereco: {
                            residencial: objContratante.enderecoResidencialAluno,
                            comercial: objContratante.enderecoComercialAluno
                        },
                        cep: {
                            residencial: objContratante.cepResidencialAluno,
                            comercial: objContratante.cepComercialAluno
                        }
                    },
                    responsavel: {
                        nome: objContratante.nomeResponsavel,
                        cpf: objContratante.cpfResponsavel,
                        rg: objContratante.rgResponsavel,
                        endereco: objContratante.enderecoResponsavel,
                        estadocivil: objContratante.estadocivilResponsavel,
                        nacionalidade: objContratante.nacionalidadeResponsavel
                    },
                    valores: {
                        /**
                         * variaveisClausula[0]: anuidade cheia
                         * variaveisClausula[1]: anuidade cheia por extenso
                         * variaveisClausula[2]: número de parcelas
                         * variaveisClausula[3]: número de parcelas por extenso
                         * variaveisClausula[4]: valor da matrícula
                         * variaveisClausula[5]: valor da matrícula por extenso
                         * variaveisClausula[6]: valor da mensalidade
                         * variaveisClausula[7]: valor da mensalidade por extenso
                         */
                        variaveisClausula: [
                            objContratante.anuidadeCheia
                            , objContratante.anuidadeExtenso
                            , objContratante.numeroParcelas
                            , objContratante.numeroParcelasExtenso
                            , objContratante.valorMatricula
                            , objContratante.valorMatriculaExtenso
                            , objContratante.valorParcela
                            , objContratante.valorParcelaExtenso
                        ],
                        /**
                         * variaveisParagrafo[0]: dia do vencimento das mensalidades
                         * variaveisParagrafo[1]: dia do vencimento das mensalidades por extenso
                         */
                        variaveisParagrafo: [
                            objContratante.diaVencimento
                            , objContratante.diaVencimentoExtenso
                        ]
                    }

                };

                switch (unidade) {

                    case 'foc':
                        modelClausulas = require('../../model/contrato/json/foc/1.0.0.json');
                        break;
                    case 'fcd':
                        modelClausulas = require('/contrato/api/fcd/1/0/0/');
                        break;
                    case 'fatec':
                        modelClausulas = require('/contrato/api/fatec/1/0/0/');
                        break;
                    default:
                        modelClausulas = require('/contrato/api/foc/1/0/0/');

                }

                let contrato = {
                    clausulas: modelClausulas,
                    contratante: contratante
                };

                let ano = modelClausulas.ano, semestre = modelClausulas.semestre;

                var html = helperContrato(contrato.clausulas, contrato.contratante);

                let rootPath = './public/' + ano + '/' + semestre + '/';

                //console.log(rootPath);

                fs.writeFileSync(rootPath + matricula + '.html', html);

                //var makePdf = function (pdf) {fs.writeFileSync(rootPath + matricula + '.pdf', pdf);}

                function makePdf(pdf){
                    fs.writeFileSync(rootPath + matricula + '.pdf', pdf);
                }

                convertHTMLToPDF(html, makePdf, null, null, true); 
               
                res.render(

                    'contrato/sucesso',

                    {
                        aluno: contratante.aluno.nome,
                        matricula: contratante.aluno.matricula,
                        ano: ano,
                        semestre: semestre,
                        unidade: unidade.toUpperCase()

                    }
                )

            }

        }

    );

});

module.exports = router;



