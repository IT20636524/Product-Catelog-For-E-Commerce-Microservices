const express = require("express");
const router = express.Router();
const { addReview, getReviews } = require("../controllers/reviewController");
const { protect, buyerProtect } = require("../middleware/authMiddleware");

router.route("/:productId").get(protect, getReviews).put(protect, buyerProtect, addReview);

module.exports = router;