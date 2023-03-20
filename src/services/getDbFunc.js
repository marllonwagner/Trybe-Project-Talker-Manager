const camelize = require('camelize');
const tasksDB = require('../db/tasksDb');

async function getTalkerDbFunc(_req, res) {
  try {
      const [resultAll] = await tasksDB.findAll();
 const result = resultAll.map((e) => ({
    name: e.name,
    age: e.age,
    id: e.id,
    talk: { watchedAt: e.talk_watched_at,
            rate: e.talk_rate },
  }));

      res.status(200).json(result);
  } catch (err) {
  res.status(500).json({ message: err.sqlMessage });
}
}

module.exports = getTalkerDbFunc;