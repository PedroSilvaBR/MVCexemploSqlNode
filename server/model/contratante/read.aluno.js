function model(matricula){

let query = `

        SELECT
             nomeAluno
            ,rgAluno
            ,cpfAluno
            ,matriculaAluno
            ,cursoAluno
            ,enderecoResidencialAluno
            ,cepAluno
            ,telefoneAluno
            ,emailAluno
        FROM
            NODE_viewContratoModelAluno
        WHERE
            RTRIM(matriculaAluno) = '${ matricula.trim() }'

        `

    return query

}

module.exports = model;