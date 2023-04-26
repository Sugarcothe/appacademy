const dbConfig = require("../config/dbconfig.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialet,
  operatorsAliases: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log(`connected...`);
  })
  .catch((err) => {
    console.log(`error: ${err}`);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./productModel.js")(sequelize, DataTypes);
db.users = require("./userModel.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("Yes re-sync completed");
});

module.exports = db;
