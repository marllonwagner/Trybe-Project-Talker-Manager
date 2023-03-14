const crypt = require('crypto');

  async function postLoginFunc(_requisition, response) {
await response.status(200).json({ token: crypt.randomBytes(8).toString('hex') });
}

module.exports = postLoginFunc;