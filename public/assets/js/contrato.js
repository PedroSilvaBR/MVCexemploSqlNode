// *******************************************************************************************************************************************
// Dados fictícios... Em produção retornam do banco

var contratante = {
    aluno: {
        nome: "Aluno teste",
        rg: "RG teste",
        cpf: "CPF teste",
        matricula: "Matricula teste",
        curso: "Curso teste",
        email: "Email teste",
        telefone: {
            residencial: "TEL-residencial",
            comercial: "TEL-comercial",
            ramal: "Ramal-COM"
        },
        endereco: {
            residencial: "Endereço residencial teste",
            comercial: "Endereço comercial teste"
        },
        cep: {
            residencial: "00000-RES",
            comercial: "00000-COM"
        }
    },
    responsavel: {
        nome: "Responsável teste",
        cpf: "CPF resp teste",
        rg: "RG resp teste",
        endereco: "Endereco resp teste",
        estadocivil: "Estado civil resp teste",
        nacionalidade: "Nacionalidade teste"
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
        variaveisClausula: ["24.000,00", "vinte e quatro mil reais", 12, "doze", "2.000,00", "dois mil reais", "2.000,00", "dois mil reais"],
        /**
         * variaveisParagrafo[0]: dia do vencimento das mensalidades
         * variaveisParagrafo[1]: dia do vencimento das mensalidades por extenso
         */
        variaveisParagrafo: [10, "dez"]
    }
};

// *******************************************************************************************************************************************

function contrato(apiTextoContrato, apiDadosContrato) {

    httpRequest(apiTextoContrato, helperContrato);
    //httpRequest(apiDadosContrato, getDadosContrato);

}

function getDadosContrato(dadosContrato) {

    var contratante = {
        aluno: {
            nome: dadosContrato.nomeAluno,
            rg: dadosContrato.rgAluno,
            cpf: dadosContrato.cpfAluno,
            matricula: dadosContrato.matriculaAluno,
            curso: dadosContrato.cursoAluno,
            email: dadosContrato.emailAluno,
            telefone: {
                residencial: dadosContrato.telefoneResidencialAluno,
                comercial: dadosContrato.telefoneComercialAluno,
                ramal: dadosContrato.ramalAluno
            },
            endereco: {
                residencial: dadosContrato.enderecoAluno,
                comercial: dadosContrato.enderecoComercialAluno
            },
            cep: {
                residencial: dadosContrato.cepResidencialAluno,
                comercial: dadosContrato.cepComercialAluno
            }
        },
        responsavel: {
            nome: dadosContrato.nomeResponsavel,
            cpf: dadosContrato.cpfResponsavel,
            rg: dadosContrato.rgResponsavel,
            endereco: dadosContrato.enderecoResponsavel,
            estadocivil: dadosContrato.estadocivilResponsavel,
            nacionalidade: dadosContrato.nacionalidadeResponsavel
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
                dadosContrato.anuidadeCheia,
                dadosContrato.anuidadeCheiaExtenso,
                dadosContrato.numParcelas,
                dadosContrato.numParcelasExtenso,
                dadosContrato.valorMatricula,
                dadosContrato.valorMatriculaExtenso,
                dadosContrato.valorMensalidade,
                dadosContrato.valorMensalidadeExtenso
            ],

            /**
             * variaveisParagrafo[0]: dia do vencimento das mensalidades
             * variaveisParagrafo[1]: dia do vencimento das mensalidades por extenso
             */
            variaveisParagrafo: [
                dadosContrato.diaVencimentoMensalidades,
                dadosContrato.diaVencimentoMensalidadesExtenso
            ]
        }
    };

}

function helperContrato(objJson) {

    //console.log(objJson);

    let contrato_ = objJson;

    document.title = contrato_.cabecalho;

    let contrato = document.getElementById("contrato"), htmlHelper = "";

    if (!contrato_) { htmlHelper += "Nenhum modelo disponível"; } else {

        // Cabeçalho
        htmlHelper += "<p class='h3 p-3 font-weight-bold'>"
        for (let i in contrato_.contrato) { htmlHelper += contrato_.contrato[i].trim() + "<br>"; }
        htmlHelper += "</p>"

        // Contratado
        htmlHelper += "<div class='border p-3'>";
        htmlHelper += "<strong>Contratado:</strong> " + contrato_.contratado.mantenedora + ",<br>";
        htmlHelper += "mantenedor das <strong>" + contrato_.contratado.mantida + "</strong><br>";
        htmlHelper += "CNPJ/MF " + contrato_.contratado.cnpj + "<br>";
        htmlHelper += contrato_.contratado.endereco + "<br>";
        htmlHelper += contrato_.contratado.denominacao.escola + "<br>";
        htmlHelper += "</div>";

        // Contratante
        htmlHelper += "<p class='text-left mt-4'>" + contrato_.contratante.denominacao.aluno + "</p>";
        htmlHelper += "<div class='text-left'>";
        htmlHelper += "Aluno: " + contratante.aluno.nome + " - RG: " + contratante.aluno.rg + " - CPF: " + contratante.aluno.cpf + "<br>";
        htmlHelper += "Matrícula nº : " + contratante.aluno.matricula + " - Curso: " + contratante.aluno.curso + "<br>";
        htmlHelper += "Endereço residencial : " + contratante.aluno.endereco.residencial + "<br>";
        htmlHelper += "Fone : " + contratante.aluno.telefone.residencial + " - CEP: " + contratante.aluno.cep.residencial + "<br>";
        htmlHelper += "Endereço comercial : " + contratante.aluno.endereco.comercial + "<br>";
        htmlHelper += "Fone comercial: " + contratante.aluno.telefone.comercial + " - CEP: " + contratante.aluno.telefone.ramal + "<br>"
        htmlHelper += "E-mail: " + contratante.aluno.email + "<br>";
        htmlHelper += "</div>";
        htmlHelper += "<p class='text-left mt-4'>" + contrato_.contratante.denominacao.responsavel + "</p>";

        // Responsável
        htmlHelper += "<div class='text-left border p-1 mb-1'>";
        htmlHelper += "<b>RESPONSÁVEL</b>: " + contratante.responsavel.nome;
        htmlHelper += "</div>";
        htmlHelper += "<div class='text-left border p-1 mb-1'>";
        htmlHelper += "CPF: " + contratante.responsavel.cpf + " - RG: " + contratante.responsavel.cpf;
        htmlHelper += "</div>";
        htmlHelper += "<div class='text-left border p-1 mb-1'>";
        htmlHelper += "Endereço: " + contratante.responsavel.endereco;
        htmlHelper += "</div>";
        htmlHelper += "<div class='text-left border p-1 mb-1'>";
        htmlHelper += "Estado civil: " + contratante.responsavel.estadocivil + " - Nacionalidade: " + contratante.responsavel.nacionalidade;
        htmlHelper += "</div>";

        htmlHelper += "<p class='text-left mt-4'>" + contrato_.introducao + "</p>";

        // Cláusulas
        let clausulas = contrato_.clausula;
        for (let clausula in clausulas) {

            htmlHelper += "<div class='text-justify mb-2 " + clausulas[clausula].class + "'>";
            if (clausulas[clausula].variaveis) {

                let variaveisClausula = clausulas[clausula].variaveis, textoClausulaVariavel = clausulas[clausula].texto;
                for (i = 0; i < variaveisClausula.length; i++) {
                    textoClausulaVariavel = textoClausulaVariavel.replace(variaveisClausula[i], contratante.valores.variaveisClausula[i]);
                }
                htmlHelper += "<p><b>" + clausulas[clausula].titulo + "</b> - " + textoClausulaVariavel + "</p>";

            } else {

                htmlHelper += "<p><b>" + clausulas[clausula].titulo + "</b> - " + clausulas[clausula].texto + "</p>";

            }

            // Parágrafos
            let paragrafos = clausulas[clausula].paragrafo;
            for (let paragrafo in paragrafos) {

                if (paragrafos[paragrafo].variaveis) {

                    let variaveisParagrafo = paragrafos[paragrafo].variaveis, textParagrafoVariavel = paragrafos[paragrafo].texto;
                    for (i = 0; i < paragrafos[paragrafo].variaveis.length; i++) {
                        textParagrafoVariavel = textParagrafoVariavel.replace(variaveisParagrafo[i], contratante.valores.variaveisParagrafo[i]);
                    }
                    htmlHelper += "<p><b>" + paragrafos[paragrafo].titulo + "</b> - " + textParagrafoVariavel + "</p>";

                } else {

                    htmlHelper += "<p><b>" + paragrafos[paragrafo].titulo + "</b> - " + paragrafos[paragrafo].texto + "</p>";

                }


            }

            htmlHelper += "</div>";

        }

    }

    contrato.innerHTML = htmlHelper;

}