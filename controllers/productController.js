const Product = require("../models/Product");

async function generateProductId() {
  let productNumber = await Product.countDocuments({});
  console.log("Products List", productNumber);
  return productNumber < 9
    ? "p_00" + (productNumber + 1)
    : "p_0" + (productNumber + 1);
}

const addProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    newProduct.productId = await generateProductId();
    try {
      const product = await newProduct.save();
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    console.log(err);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getProductsAccordingToCategory = async (req, res) => {
  try {
    let products;
    products = await Product.find({ category: req.params.category });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

const searchProducts = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { category: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const products = await Product.find(keyword);

  res.status(200).json(products);
};

const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ productId: req.params.productId });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { productId: req.params.productId },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete({
      productId: req.params.productId,
    });
    res.status(200).json("Product has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductsAccordingToCategory,
  searchProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
};
