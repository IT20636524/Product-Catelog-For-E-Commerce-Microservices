const express = require("express");
const router = express.Router();
const { addReview, getReviews, getAllReviews } = require("../controllers/reviewController");
const { protect, buyerProtect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getAllReviews);
router.route("/:productId").get(protect, getReviews).put(protect, buyerProtect, addReview);

module.exports = router;