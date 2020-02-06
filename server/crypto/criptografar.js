const crypto = require("crypto"),
      config = require('./config');

function criptografar(senha) {
	const cipher = crypto.createCipher(config.algoritmo, config.segredo);
	cipher.update(senha);
	return cipher.final(config.tipo);
};


module.exports = criptografar;