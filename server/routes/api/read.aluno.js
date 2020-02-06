const express = require('express');
const controller = require('../../controller/contratante/read.aluno');
const router = express.Router();

router.get('/contrato/read/aluno/:matricula?', function(req, res, next) {

    controller(req, res);

});

module.exports = router;