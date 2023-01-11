

const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    uri:'mongodb://localhost/UserBase',
    secret :crypto,
    db:'UserBase'
}