const connection = require('./connection');

const findAll = () => connection.execute(
  'SELECT * FROM TalkerDB.talkers;',
);

module.exports = {
  findAll,

};