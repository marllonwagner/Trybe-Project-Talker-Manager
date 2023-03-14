const express = require('express');

const getTalkerFunc = require('./services/getFunc');

const postLoginFunc = require('./services/postFunc');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker/:id?', async (req, res) => {
  await getTalkerFunc(req, res);
});

app.post('/login', async (req, res) => {
   await postLoginFunc(req, res);
  });