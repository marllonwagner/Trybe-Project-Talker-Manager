const express = require('express');

const getTalkerFunc = require('./services/getFunc');

const { postLoginFunc, postTalkerFunc } = require('./services/postFunc');

const { isValidEmail } = require('./middlewares/validateEmail');

const { isValidPass } = require('./middlewares/validatePassword');

const isValidToken = require('./middlewares/validateToken');

const isNameValid = require('./middlewares/validateName');

const isAgeValid = require('./middlewares/validateAge');

const isTalkValid = require('./middlewares/validateTalk');

const validRate = require('./middlewares/validateRate');

const validWatched = require('./middlewares/validateWatched');

const putTalkerFunc = require('./services/putFunc');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/:id?', async (req, res) => {
  await getTalkerFunc(req, res);
});

app.post('/login', isValidEmail, isValidPass, async (req, res) => {
  await postLoginFunc(req, res);
});

app.post('/talker', isValidToken, isNameValid, 
isAgeValid, isTalkValid, validWatched, validRate, async (req, res) => {
  await postTalkerFunc(req, res);
});

app.put('/talker/:id', isValidToken, isNameValid, 
isAgeValid, isTalkValid, validWatched, validRate, async (req, res) => {
  await putTalkerFunc(req, res);
});

app.listen(PORT, () => {
  console.log('Online');
});