// generateSecretKey.js

const crypto = require('crypto');

const secretKey = crypto.randomBytes(32).toString('base64');
console.log("Generated JWT Secret Key:", secretKey);

//Sq39Qx6S2KZKOehGTnV6cyGv8XVkScOp8Gjam8xeNG4=
