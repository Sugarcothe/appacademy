const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Product = db.products;
const User = db.users;

// CREATE USER
const createUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    res.status(200).send(user);
    console.log(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// LOGIN USER
const login = async (req, res) => {
  try {
    let info = {
      email: req.body.email,
      password: req.body.password,
    };

    const user = await User.findOne({ where: { email: info.email } });

    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(info.password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    const { password, ...others } = user.dataValues;         
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    console.log(err);
  }
};

// UPDATE USER
const updateUser = async (req, res) => {
  let id = req.params.id;
  const product = await Product.update(req.body, { where: { id: id } });
  res.status(200).send(product);
};

// DELETE USER
const deleteUser = async (req, res) => {
  let id = req.params.id;
  await User.destroy(req.body, { where: { id: id } });
  res.status(200).send("Product was successfully deleted!");
};

module.exports = {
  updateUser,
  deleteUser,
  login,
  createUser,
};
