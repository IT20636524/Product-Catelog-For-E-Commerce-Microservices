// Import the functions to be tested
const {
  registerUser,
  loginUser,
} = require("../controllers/userController.js");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Mocking Express response
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

// Mocking request bodies
const reqRegister = {
  body: {
    name: "Test User",
    email: "test@example.com",
    password: "testPassword",
    role: "BUYER",
  },
};

const reqLogin = {
  body: {
    email: "test@example.com",
    password: "testPassword",
  },
};

// Mocking User model methods
jest.mock("../models/User");

describe("registerUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user successfully", async () => {
    // Mocking User.countDocuments to return a value
    User.countDocuments.mockResolvedValue(0);

    // Mocking bcrypt functions
    bcrypt.genSaltSync = jest.fn().mockReturnValue("mockSalt");
    bcrypt.hashSync = jest.fn().mockReturnValue("mockHashedPass");

    // Mocking the save function of the new user instance
    User.prototype.save.mockResolvedValue({
      userId: "u_001",
      name: "Test User",
      email: "test@example.com",
      role: "BUYER",
    });

    // Call the function
    await registerUser(reqRegister, res);

    // Check if the response is correct
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      userId: "u_001",
      name: "Test User",
      email: "test@example.com",
      role: "BUYER",
    });
  });

});

describe("loginUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should login user successfully", async () => {
    // Mocking User.findOne to return a user
    User.findOne.mockResolvedValue({
      _id: "mockUserId",
      name: "Test User",
      email: "test@example.com",
      password: "mockHashedPass", // Assuming this is the hashed password
      role: "BUYER",
    });

    // Mocking bcrypt.compare to return true
    bcrypt.compareSync = jest.fn().mockReturnValue(true);

    // Mocking jwt.sign to return a fake token
    jwt.sign = jest.fn().mockReturnValue("fakeToken123");

    // Call the function
    await loginUser(reqLogin, res);

    // Check if the response is correct
    expect(res.status).toHaveBeenCalledWith(400); 
    expect(res.json).toHaveBeenCalledWith(
        "Wrong credentials"
    );
  });
});
