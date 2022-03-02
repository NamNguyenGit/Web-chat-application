const router = require("express").Router();
const { index } = require("../controllers/chatControllers");
const { validate } = require("../validators");
const {auth} = require('../middleware/auth')


router.get("/", [auth], index);

module.exports = router;
