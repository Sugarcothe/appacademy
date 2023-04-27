const productControllers = require("../controllers/productControllers");
const { verifyToken } = require("../verifyToken");

const router = require("express").Router();
router.post("/addProduct", productControllers.addProduct);
router.get("/", productControllers.getAllProducts);

router.get("/:id", productControllers.getOneProduct);
router.put("/:id", productControllers.updateProduct);
router.delete("/:id", productControllers.deleteProduct);

module.exports = router;
