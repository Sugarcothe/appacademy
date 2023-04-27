const userControllers = require("../controllers/userController");

const router = require("express").Router();
router.post("/signup", userControllers.createUser);
router.post("/login", userControllers.login);
router.put("/:id", userControllers.updateUser);
router.delete("/:id", userControllers.deleteUser);

module.exports = router;
