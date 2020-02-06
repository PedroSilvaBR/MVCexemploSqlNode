const descriptografar = require('./descriptografar');

function compare(senha, hashdb){

     let decriptHashDb = descriptografar(hashdb);
     if(senha == decriptHashDb){

         return true;

     } else {

         return false;

     }

};

module.exports = compare;