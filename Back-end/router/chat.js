const router = require("express").Router();
const { index, create } = require("../controllers/chatControllers");
const { validate } = require("../validators");
const {auth} = require('../middleware/auth')


router.get("/", [auth], index);
router.post("/create", [auth], create);

module.exports = router;
