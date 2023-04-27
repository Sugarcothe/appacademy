const db = require("../models");

const Product = db.products;
const User = db.users;

// CREATE PRODUCT
const addProduct = async (req, res) => {
  let info = {
    title: req.body.title,
    price: req.body.price,
  };

  const product = await Product.create(info);
  res.status(200).send(product);
  console.log(product);
};

// GET ALL PRODUCT
const getAllProducts = async (req, res) => {
  let products = await Product.findAll({
    attributes: ["title", "price"],
  });
  res.status(200).send(products);
  res.send(products);
};

// GET ONE PRODUCT
const getOneProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let product = await Product.findOne({ where: { id: id } });
    res.status(200).send(product);
    return res.send(product);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  let id = req.params.id;
  const product = await Product.update(req.body, { where: { id: id } });
  res.status(200).send("Product updated successfully");
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ where: { id } });

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    await product.destroy();

    res.send({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: "An error occurred while deleting the product" });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
};
