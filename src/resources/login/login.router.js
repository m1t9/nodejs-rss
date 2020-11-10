const router = require('express').Router();
const loginService = require('./login.service');
const wrapAsync = require('../../utils/wrapAsync');

router.post(
  '/',
  wrapAsync(async (req, res) => {
    const { login, password } = req.body;
    const token = await loginService.signToken(login, password);
    res.status(200).json({ token });
  })
);

module.exports = router;
