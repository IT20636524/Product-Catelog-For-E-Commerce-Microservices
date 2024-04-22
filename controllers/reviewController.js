const Product = require("../models/Product");

const addReview = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { rating, reviewMessage } = req.body;

    const updatedProduct = await Product.findOneAndUpdate(
      { productId: productId },
      {
        $push: {
          reviews: {
            rating: rating,
            reviewMessage: reviewMessage,
          },
        },
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findOne({ productId: productId });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const reviews = product.reviews;

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllReviews = async (req, res) => {

};


module.exports = { addReview, getReviews, getAllReviews };
