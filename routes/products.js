const express = require("express");
const router = express.Router();
const { addProduct, getAllProducts, getOneProduct, getProductsAccordingToCategory, searchProducts, updateProduct, deleteProduct } = require("../controllers/productController");

router.route("/").post(addProduct).get(searchProducts);
router.route("/all").get(getAllProducts);
router.route("/:category").get(getProductsAccordingToCategory);
router.route("/:productId").get(getOneProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
