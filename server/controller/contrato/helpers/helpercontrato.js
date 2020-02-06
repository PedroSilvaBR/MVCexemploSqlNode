function helperContrato(clausulas, contratante){

    let html = `
    
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset='utf-8'>
                    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
                    <title>
                        Contrato: ${ contratante.aluno.matricula } - Grupo Oswaldo Cruz
                    </title>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                </head>
                <body style='margin: 20pt;'>
                    <div id="divContrato">
                        <div style="font-size: 14pt; font-family: 'Times New Roman', Times, serif; "
                            id="contrato">${ helperClausulas(clausulas, contratante) }</div>
                    </div>
                </body>
                </html>

            `

    return html;

};

function helperClausulas(contrato, contratante) {

    let htmlHelper = '';

    if (!contrato) { htmlHelper += "Nenhum modelo disponível"; } else {

        // Cabeçalho
        htmlHelper += "<p style='font-size: 17pt; font-weight: bold; text-align: center; margin-top: -30px;'>"
        for (let i in contrato.contrato) { htmlHelper += contrato.contrato[i].trim() + "<br>"; }
        htmlHelper += "</p>"

        // Contratado
        htmlHelper += "<div style=' border: 2px solid #000000; padding: 10px; text-align: center;'>";
        htmlHelper += "<strong>Contratado:</strong> " + contrato.contratado.mantenedora + ",<br>";
        htmlHelper += "mantenedor das <strong>" + contrato.contratado.mantida + "</strong><br>";
        htmlHelper += "CNPJ/MF " + contrato.contratado.cnpj + "<br>";
        htmlHelper += contrato.contratado.endereco + "<br>";
        htmlHelper += contrato.contratado.denominacao.escola + "<br>";
        htmlHelper += "</div>";

        // Contratante
        htmlHelper += "<p>" + contrato.contratante.denominacao.aluno + "</p>";
        htmlHelper += "<div style='border: 1px solid #000000; padding: 5px; margin-bottom: 5px;'>";
        htmlHelper += "Aluno: " + contratante.aluno.nome;
        htmlHelper += "</div>";
        htmlHelper += "<div style='border: 1px solid #000000; padding: 5px; margin-bottom: 5px;'>";
        htmlHelper += "RG: " + contratante.aluno.rg;
        htmlHelper += "</div>";
        htmlHelper += "<div style='border: 1px solid #000000; padding: 5px; margin-bottom: 5px;'>";
        htmlHelper += "CPF: " + contratante.aluno.cpf;
        htmlHelper += "</div>";
        htmlHelper += "<div style='border: 1px solid #000000; padding: 5px; margin-bottom: 5px;'>";
        htmlHelper += "Matrícula nº : " + contratante.aluno.matricula;
        htmlHelper += "</div>";
        htmlHelper += "<div style='border: 1px solid #000000; padding: 5px; margin-bottom: 5px;'>";
        htmlHelper += "Curso: " + contratante.aluno.curso;
        htmlHelper += "</div>";
        htmlHelper += "<div style='border: 1px solid #000000; padding: 5px; margin-bottom: 5px;'>";
        htmlHelper += "Endereço residencial : " + contratante.aluno.endereco.residencial;
        htmlHelper += "</div>";
        htmlHelper += "<div style='border: 1px solid #000000; padding: 5px; margin-bottom: 5px;'>";
        htmlHelper += "Fone : " + contratante.aluno.telefone.residencial;
        htmlHelper += "</div>";
        htmlHelper += "<div style='border: 1px solid #000000; padding: 5px; margin-bottom: 5px;'>";
        htmlHelper += "CEP: " + contratante.aluno.cep.residencial;
        htmlHelper += "</div>";
        htmlHelper += "<div style='border: 1px solid #000000; padding: 5px; margin-bottom: 5px;'>";
        htmlHelper += "Endereço comercial : " + contratante.aluno.endereco.comercial + "<br>";
        htmlHelper += "</div>";
        htmlHelper += "<div style='border: 1px solid #000000; padding: 5px; margin-bottom: 5px;'>";
        htmlHelper += "Fone comercial: " + contratante.aluno.telefone.comercial;
        htmlHelper += "</div>";
        htmlHelper += "<div style='border: 1px solid #000000; padding: 5px; margin-bottom: 5px;'>";
        htmlHelper += "CEP: " + contratante.aluno.telefone.ramal;
        htmlHelper += "</div>";
        htmlHelper += "<div style='border: 1px solid #000000; padding: 5px; margin-bottom: 5px;'>";
        htmlHelper += "E-mail: " + contratante.aluno.email + "<br>";
        htmlHelper += "</div>";
        htmlHelper += "<p>" + contrato.contratante.denominacao.responsavel + "</p>";

        // Responsável
        htmlHelper += "<div style='border: 1px solid #000000; padding: 5px; margin-bottom: 5px;'>";
        htmlHelper += "<b>RESPONSÁVEL</b>: " + contratante.responsavel.nome;
        htmlHelper += "</div>";
        htmlHelper += "<div style='border: 1px solid #000000; padding: 5px; margin-bottom: 5px;'>";
        htmlHelper += "CPF: " + contratante.responsavel.cpf ;
        htmlHelper += "</div>";
        htmlHelper += "<div style='border: 1px solid #000000; padding: 5px; margin-bottom: 5px;'>";
        htmlHelper += "RG: " + contratante.responsavel.cpf;
        htmlHelper += "</div>";
        htmlHelper += "<div style='border: 1px solid #000000; padding: 5px; margin-bottom: 5px;'>";
        htmlHelper += "Endereço: " + contratante.responsavel.endereco;
        htmlHelper += "</div>";
        htmlHelper += "<div style='border: 1px solid #000000; padding: 5px; margin-bottom: 5px;'>";
        htmlHelper += "Estado civil: " + contratante.responsavel.estadocivil + " - Nacionalidade: " + contratante.responsavel.nacionalidade;
        htmlHelper += "</div>";

        htmlHelper += "<p>" + contrato.introducao + "</p>";

        // Cláusulas
        let clausulas = contrato.clausula;
        for (let clausula in clausulas) {

            htmlHelper += "<div style='text-align: justify; margin-bottom: 5px; " + clausulas[clausula].style + "'>";
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

   return htmlHelper;

};

module.exports = helperContrato;