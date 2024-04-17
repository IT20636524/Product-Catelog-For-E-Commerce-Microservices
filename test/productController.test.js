const {
  addProduct,
  getAllProducts,
  getProductsAccordingToCategory,
  searchProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController.js");
const Product = require("../models/Product");

jest.mock("../models/Product");

// Mocking Express response
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

// Mocking request bodies
const reqAddProduct = {
  body: {
    name: "Test Product",
    description: "Test Description",
    price: 100,
    category: "Electronics",
    brand: "Test Brand",
    quantity: 10,
  },
};

const reqGetProductsByCategory = {
  params: {
    category: "Electronics",
  },
};

const reqGetOneProduct = {
  params: {
    productId: "p_001",
  },
};

const reqUpdateProduct = {
  params: {
    productId: "p_001",
  },
  body: {
    name: "Updated Product",
  },
};

const reqDeleteProduct = {
  params: {
    productId: "p_001",
  },
};

describe("addProduct", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should add a new product successfully", async () => {
    // Mocking Product.countDocuments to return a value
    Product.countDocuments.mockResolvedValue(0);

    // Mocking the save function of the new product instance
    Product.prototype.save.mockResolvedValue({
      productId: "p_001",
      name: "Test Product",
      description: "Test Description",
      price: 100,
      category: "Electronics",
      brand: "Test Brand",
      quantity: 10,
    });

    // Call the function
    await addProduct(reqAddProduct, res);

    // Check if the response is correct
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      productId: "p_001",
      name: "Test Product",
      description: "Test Description",
      price: 100,
      category: "Electronics",
      brand: "Test Brand",
      quantity: 10,
    });
  });
});

describe("getAllProducts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get all products", async () => {
    // Mocking Product.find to return products
    Product.find.mockResolvedValue([
      {
        productId: "p_001",
        name: "Test Product 1",
        description: "Test Description 1",
        price: 100,
        category: "Electronics",
        brand: "Test Brand 1",
        quantity: 10,
      },
      {
        productId: "p_002",
        name: "Test Product 2",
        description: "Test Description 2",
        price: 200,
        category: "Fashion",
        brand: "Test Brand 2",
        quantity: 20,
      },
    ]);

    // Call the function
    await getAllProducts({}, res);

    // Check if the response is correct
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      {
        productId: "p_001",
        name: "Test Product 1",
        description: "Test Description 1",
        price: 100,
        category: "Electronics",
        brand: "Test Brand 1",
        quantity: 10,
      },
      {
        productId: "p_002",
        name: "Test Product 2",
        description: "Test Description 2",
        price: 200,
        category: "Fashion",
        brand: "Test Brand 2",
        quantity: 20,
      },
    ]);
  });
});

describe("getProductsAccordingToCategory", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get products according to category", async () => {
    // Mocking Product.find to return products
    Product.find.mockResolvedValue([
      {
        productId: "p_001",
        name: "Test Product 1",
        description: "Test Description 1",
        price: 100,
        category: "Electronics",
        brand: "Test Brand 1",
        quantity: 10,
      },
      {
        productId: "p_002",
        name: "Test Product 2",
        description: "Test Description 2",
        price: 200,
        category: "Electronics",
        brand: "Test Brand 2",
        quantity: 20,
      },
    ]);

    // Call the function
    await getProductsAccordingToCategory(reqGetProductsByCategory, res);

    // Check if the response is correct
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      {
        productId: "p_001",
        name: "Test Product 1",
        description: "Test Description 1",
        price: 100,
        category: "Electronics",
        brand: "Test Brand 1",
        quantity: 10,
      },
      {
        productId: "p_002",
        name: "Test Product 2",
        description: "Test Description 2",
        price: 200,
        category: "Electronics",
        brand: "Test Brand 2",
        quantity: 20,
      },
    ]);
  });
});

describe("searchProducts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should search products by keyword", async () => {
    // Mocking Product.find to return products
    Product.find.mockResolvedValue([
      {
        productId: "p_001",
        name: "Test Product 1",
        description: "Test Description 1",
        price: 100,
        category: "Electronics",
        brand: "Test Brand 1",
        quantity: 10,
      },
      {
        productId: "p_002",
        name: "Test Product 2",
        description: "Test Description 2",
        price: 200,
        category: "Fashion",
        brand: "Test Brand 2",
        quantity: 20,
      },
    ]);

    // Call the function and await it
    await searchProducts({ query: { search: "Test" } }, res);

    // Check if the response is correct
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      {
        productId: "p_001",
        name: "Test Product 1",
        description: "Test Description 1",
        price: 100,
        category: "Electronics",
        brand: "Test Brand 1",
        quantity: 10,
      },
      {
        productId: "p_002",
        name: "Test Product 2",
        description: "Test Description 2",
        price: 200,
        category: "Fashion",
        brand: "Test Brand 2",
        quantity: 20,
      },
    ]);
  });

});

describe("getOneProduct", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get one product by productId", async () => {
    // Mocking Product.findOne to return a product
    Product.findOne.mockResolvedValue({
      productId: "p_001",
      name: "Test Product",
      description: "Test Description",
      price: 100,
      category: "Electronics",
      brand: "Test Brand",
      quantity: 10,
    });

    // Call the function
    await getOneProduct(reqGetOneProduct, res);

    // Check if the response is correct
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      productId: "p_001",
      name: "Test Product",
      description: "Test Description",
      price: 100,
      category: "Electronics",
      brand: "Test Brand",
      quantity: 10,
    });
  });
});

describe("updateProduct", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update a product", async () => {
    // Mocking Product.findOneAndUpdate to return updated product
    Product.findOneAndUpdate.mockResolvedValue({
      productId: "p_001",
      name: "Updated Product",
      description: "Test Description",
      price: 100,
      category: "Electronics",
      brand: "Test Brand",
      quantity: 10,
    });

    // Call the function
    await updateProduct(reqUpdateProduct, res);

    // Check if the response is correct
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      productId: "p_001",
      name: "Updated Product",
      description: "Test Description",
      price: 100,
      category: "Electronics",
      brand: "Test Brand",
      quantity: 10,
    });
  });
});

describe("deleteProduct", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a product", async () => {
    // Mocking Product.findOneAndDelete to return a deleted product
    Product.findOneAndDelete.mockResolvedValue({
      productId: "p_001",
      name: "Test Product",
      description: "Test Description",
      price: 100,
      category: "Electronics",
      brand: "Test Brand",
      quantity: 10,
    });

    // Call the function
    await deleteProduct(reqDeleteProduct, res);

    // Check if the response is correct
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("Product has been deleted");
  });
});
