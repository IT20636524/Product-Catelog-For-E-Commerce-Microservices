const express = require("express");
const router = express.Router();
const { addProduct, getAllProducts, getOneProduct, getProductsAccordingToCategory, searchProducts, updateProduct, deleteProduct } = require("../controllers/productController");
const { protect, sellerProtect } = require('../middleware/authMiddleware')

router.route("/").post(protect, sellerProtect, addProduct).get(protect, searchProducts);
router.route("/all").get(protect, getAllProducts);
router.route("/:category").get(protect, getProductsAccordingToCategory);
router
  .route("/:productId")
  .get(protect, getOneProduct)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
