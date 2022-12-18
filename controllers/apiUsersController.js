const User = require("../models/apiUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });

    await user.save();
    res.status(200).json({
      Message: `You just got registered! Welcome.  `, Username: req.body.username,
    });
  } catch (error) {
    res.status(400).json({ Message: error });
  }
};

exports.generateAccessToken = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (user && validPassword) {
      const payload = {
        username: user.username,
        date: user.date,
      };
      const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_TOKEN);
      res.json({ accessToken: accessToken });
    } else {
      res.json({ Message: "Incorrect user information." });
    }
  } catch (error) {
    res.json({ Message: error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const registeredUser = await User.findOne({ username: req.body.username });
    const validPassword = await bcrypt.compare(
      req.body.password,
      registeredUser.password
    );
    if (registeredUser && validPassword) {
      registeredUser.deleteOne();
      res.json("User deleted!");
    }
  } catch (error) {
    res.json({ Message: "Incorrect user or password. :(" });
  }
};

exports.getAllUsers = async (req,res) => {
  try {
  res.json(await User.find())
  } catch {
    res.json({ Message: "No users found. :(" });
  }
}