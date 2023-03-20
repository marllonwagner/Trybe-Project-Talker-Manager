const express = require('express');

const { getTalkerFunc, getTalkerSearchFunc } = require('./services/getFunc');

const { postLoginFunc, postTalkerFunc } = require('./services/postFunc');

const { isValidEmail } = require('./middlewares/validateEmail');

const { isValidPass } = require('./middlewares/validatePassword');

const isValidToken = require('./middlewares/validateToken');

const isNameValid = require('./middlewares/validateName');

const isAgeValid = require('./middlewares/validateAge');

const isTalkValid = require('./middlewares/validateTalk');

const validRate = require('./middlewares/validateRate');

const validWatched = require('./middlewares/validateWatched');

const isDateparamValid = require('./middlewares/validateDateParam');

const isDate2paramValid = require('./middlewares/validateDate2Param');

const isQ1paramValid = require('./middlewares/validateQ1param');

const isQ2paramValid = require('./middlewares/validateQ2param');

const isRateparamValid = require('./middlewares/validateRateparam');

const isRate2paramValid = require('./middlewares/validateRate2param');

const isDateQparamValid = require('./middlewares/validateQdate.param');

const putTalkerFunc = require('./services/putFunc');

const delTalkerFunc = require('./services/delFunc');

const patchTalkerFunc = require('./services/patchFunc');

const validRatePatch = require('./middlewares/validateRatePatch');

const isQRateparamValid = require('./middlewares/validateQRateParam');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar

app.get('/talker/search', isValidToken, isQRateparamValid, 
isDateQparamValid, isDateparamValid, isDate2paramValid, isQ1paramValid,
 isQ2paramValid, isRateparamValid, isRate2paramValid, async (req, res) => {
 await getTalkerSearchFunc(req, res);
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

app.delete('/talker/:id', isValidToken, async (req, res) => {
  await delTalkerFunc(req, res);
});

app.patch('/talker/rate/:id', isValidToken, validRatePatch, async (req, res) => {
  await patchTalkerFunc(req, res);
});

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
