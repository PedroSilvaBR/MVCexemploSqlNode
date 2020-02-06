const express = require('express');
const controller = require('../../controller/contrato/create');
const router = express.Router();

router.get('/contrato/create/', function(req, res, next) {

    controller(req, res);

});

module.exports = router;