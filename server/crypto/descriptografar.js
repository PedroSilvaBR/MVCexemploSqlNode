const crypto = require("crypto"),
      config = require('./config');

function descriptografar(senha) {
	const decipher = crypto.createDecipher(config.algoritmo, config.segredo);
	decipher.update(senha, config.tipo);
	return decipher.final();
};

module.exports = descriptografar;