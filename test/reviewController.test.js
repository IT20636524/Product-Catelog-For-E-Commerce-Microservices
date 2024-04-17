const Product = require("../models/Product");
const { addReview, getReviews } = require("../controllers/reviewController");

// Mocking Product model methods
jest.mock("../models/Product");

describe("addReview", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should add a review to a product successfully", async () => {
    // Mock request and response objects
    const req = {
      params: {
        productId: "testProductId",
      },
      body: {
        rating: "5",
        reviewMessage: "Great product!",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Define the existing review
    const existingReview = {
      _id: "testReviewId",
      rating: "4",
      reviewMessage: "Good product!",
    };

    // Define the newly added review
    const newReview = {
      _id: expect.any(String), // Since the _id is generated dynamically
      rating: "5",
      reviewMessage: "Great product!",
    };

    // Mock findOneAndUpdate method to return updated product
    Product.findOneAndUpdate.mockResolvedValueOnce({
      _id: "testProductId",
      name: "Test Product",
      reviews: [existingReview, newReview], // Include both existing and new review
    });

    // Call the addReview function
    await addReview(req, res);

    // Check if the response is correct
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      _id: "testProductId",
      name: "Test Product",
      reviews: expect.arrayContaining([
        existingReview, // Ensure the existing review is present
        newReview, // Ensure the newly added review is present
      ]),
    });
  });


  it("should handle product not found", async () => {
    // Mock request and response objects
    const req = {
      params: {
        productId: "nonExistentProductId",
      },
      body: {
        rating: "5",
        reviewMessage: "Great product!",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock findOneAndUpdate method to return null (product not found)
    Product.findOneAndUpdate.mockResolvedValueOnce(null);

    // Call the addReview function
    await addReview(req, res);

    // Check if the response is correct
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Product not found",
    });
  });

  it("should handle server errors", async () => {
    // Mock request and response objects
    const req = {
      params: {
        productId: "testProductId",
      },
      body: {
        rating: "5",
        reviewMessage: "Great product!",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock findOneAndUpdate method to throw an error
    Product.findOneAndUpdate.mockRejectedValueOnce(
      new Error("Internal Server Error")
    );

    // Call the addReview function
    await addReview(req, res);

    // Check if the response is correct
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Internal Server Error",
    });
  });
});

describe("getReviews", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get reviews for a product successfully", async () => {
    // Mock request and response objects
    const req = {
      params: {
        productId: "testProductId",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock findOne method to return a product with reviews
    Product.findOne.mockResolvedValueOnce({
      _id: "testProductId",
      name: "Test Product",
      reviews: [
        {
          _id: "testReviewId1",
          rating: "5",
          reviewMessage: "Great product!",
        },
        {
          _id: "testReviewId2",
          rating: "4",
          reviewMessage: "Good product!",
        },
      ],
    });

    // Call the getReviews function
    await getReviews(req, res);

    // Check if the response is correct
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      {
        _id: "testReviewId1",
        rating: "5",
        reviewMessage: "Great product!",
      },
      {
        _id: "testReviewId2",
        rating: "4",
        reviewMessage: "Good product!",
      },
    ]);
  });

  it("should handle product not found", async () => {
    // Mock request and response objects
    const req = {
      params: {
        productId: "nonExistentProductId",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock findOne method to return null (product not found)
    Product.findOne.mockResolvedValueOnce(null);

    // Call the getReviews function
    await getReviews(req, res);

    // Check if the response is correct
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Product not found",
    });
  });

  it("should handle server errors", async () => {
    // Mock request and response objects
    const req = {
      params: {
        productId: "testProductId",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock findOne method to throw an error
    Product.findOne.mockRejectedValueOnce(new Error("Internal Server Error"));

    // Call the getReviews function
    await getReviews(req, res);

    // Check if the response is correct
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Internal Server Error",
    });
  });
});
