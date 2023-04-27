const { DataTypes, BOOLEAN } = require("sequelize");

module.exports = (sequelize, datatTypes) => {
  const Product = sequelize.define("product", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Product;
};
