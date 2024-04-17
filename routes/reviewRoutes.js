const express = require("express");
const router = express.Router();
const { addReview, getReviews } = require("../controllers/reviewController");

router.route("/:productId").get(getReviews).put(addReview);

module.exports = router;