const productControllers = require("../controllers/productControllers");
const { verifyToken } = require("../verifyToken");

const router = require("express").Router();
router.post("/addProduct", verifyToken, productControllers.addProduct);
router.get("/getAllProducts", productControllers.getAllProducts);
router.get("/published", productControllers.getPublishedProduct);

router.get("/:id", productControllers.getOneProduct);
router.put("/:id", verifyToken, productControllers.updateProduct);
router.delete("/:id", verifyToken, productControllers.deleteProduct);

module.exports = router;
