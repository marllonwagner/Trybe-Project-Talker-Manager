const { nanoid } = require('nanoid');

  async function postLoginFunc(_requisition, response) {
await response.status(200).json({ token: nanoid(16) });
}

module.exports = postLoginFunc;