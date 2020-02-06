const Pool = require('../../_db/sql/pool');
const config = require('../../_db/sql/config');
const create = require('../../model/contrato/create');
const banco = config.locaweb;

function controller(req, res){

    let   matricula = req.query.matricula
        , ano = req.query.ano
        , semestre = req.query.semestre
        , pathContrato = req.query.pathContrato
        , erro = false;

    if(!matricula || !ano || !semestre || !pathContrato ){ erro = true; }

    if(erro){

       return res.status(500).send({ erro: 'Parâmetros obrigatórios foram omitidos.' });

    } else {
        
        return Pool(banco, create(matricula, ano, semestre, pathContrato), res);

    }

}

module.exports = controller;