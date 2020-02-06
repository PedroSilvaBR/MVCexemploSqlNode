const Pool = require('../../_db/sql/pool');
const config = require('../../_db/sql/config');
const model = require('../../model/contratante/read.aluno');
const banco = config.locaweb;

function controller(req, res){

    let matricula = req.params.matricula, erro = false;

    if(!matricula){ erro = true; }

    if(erro){

       return res.status(500).send({ erro: 'Parâmetros obrigatórios foram omitidos.' });

    } else {
        
        return Pool(banco, model(matricula), res);

    }

}

module.exports = controller;