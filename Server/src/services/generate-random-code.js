var crypto = require('crypto');

const generateRandomCode = () =>  crypto.randomBytes(10).toString('hex');


module.exports = { generateRandomCode }

