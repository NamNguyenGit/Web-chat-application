const User = require("../models").User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/app");


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const secret = require("crypto").randomBytes(64).toString("hex");

    //find user
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    //check if false + password
    if (!bcrypt.compareSync(password, user.password))
      return res.status(401).json({ message: "Email or password is wrong" });

    //generate Token
    const userWithToken = generateToken(user.get({ raw: true }));
    return res.send(userWithToken);

    return res.send(user);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

exports.register = async (req, res) => {
  

  try {
    const user = await User.create(req.body);

    const userWithToken = generateToken(user.get({ raw: true }));
    return res.send(userWithToken);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const generateToken = (user) => {
  const token = jwt.sign(user, config.appKey, { expiresIn: 86400 });

  return { ...user, ...{ token } };
};