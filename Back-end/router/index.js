const router = require("express").Router();

router.get("/", (req, res) => {
  return res.send("home");
});

router.use('/', require('./auth'))
router.use('/users', require('./user'))

module.exports = router;
