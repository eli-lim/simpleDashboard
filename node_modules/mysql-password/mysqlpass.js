var crypto = require('crypto');

var mysqlPassword = module.exports = function(password) {
	var hash1 = crypto.createHash('sha1');
	hash1.update(password);
	var hash2 = crypto.createHash('sha1');
	hash2.update(hash1.digest('latin1'), 'latin1');
	return "*" + hash2.digest('hex').toUpperCase();
};