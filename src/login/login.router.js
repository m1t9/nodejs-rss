const router = require('express').Router();
const loginService = require('../login/login.service');

router.post('/', (req, res) => {
  const { login, password } = req.body;
  const token = loginService.signToken(login, password);
  res.status(200).json({ token });
});

module.exports = router;
