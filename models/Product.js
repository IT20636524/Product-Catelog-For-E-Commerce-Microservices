const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Electronics",
        "Fashion",
        "Home and Kitchen",
        "Beauty and Personal Care",
        "Health and Wellness",
        "Toys and Games",
        "Books and Media",
        "Sports and Outdoors",
        "Groceries and Gourmet Food",
        "Jewelry and Watches",
        "Baby and Maternity",
        "Office Supplies",
      ],
    },
    brand: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    images: {
      type: String,
    },
    availability: {
      type: String,
      default: "Available",
    },
    reviews: [{
        rating: {
            type: String,
            enum: ["1","2","3","4","5"],
        },
        reviewMessage: {
            type: String,
        }
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
