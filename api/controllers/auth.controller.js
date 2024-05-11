const UserModel = require("../modules/User.model.js");
const bcrypt = require("bcryptjs");
const errorHandler = require("../utils/error.js");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  try {
    const { fname, lname, age, tel, email, position, username, password } =
      req.body;

    if (
      !fname ||
      !lname ||
      !age ||
      !tel ||
      !email ||
      !position ||
      !username ||
      !password
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashpassword = bcrypt.hashSync(password, 10);

    const newUser = new UserModel({
      fname,
      lname,
      age,
      tel,
      email,
      position,
      username,
      password: hashpassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const validUser = await UserModel.findOne({ username });
    if (!validUser) {
      return next(errorHandler(404, "user not found"));
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid credentials;"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, signin };
