const db = require("../models");

const Product = db.products;
const User = db.users;

// CREATE PRODUCT
const addProduct = async (req, res) => {
  let info = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  const product = await Product.create(info);
  res.status(200).send(product);
  console.log(product);
};

// GET ALL PRODUCT
const getAllProducts = async (req, res) => {
  let products = await Product.findAll({
    attributes: ["title", "price", "description"],
  });
  res.status(200).send(products);
  res.send(products);
};

// GET ONE PRODUCT
const getOneProduct = async (req, res) => {
  let id = req.params.id();
  let product = await Product.findOne({ where: { id: id } });
  res.status(200).send(product);
  res.send(product);
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  let id = req.params.id;
  const product = await Product.update(req.body, { where: { id: id } });
  res.status(200).send(product);
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  let id = req.params.id;
  await Product.destroy(req.body, { where: { id: id } });
  res.status(200).send("Product was successfully deleted!");
};

// GET PUBLISHED PRODUCT
const getPublishedProduct = async (req, res) => {
  let products = await Product.findAll({
    where: { published: true },
  });
  res.status(200).send(products);
  res.send(products);
};

module.exports = {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  getPublishedProduct
};
