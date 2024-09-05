const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { validationResult, check } = require("express-validator");

exports.register = [
  check("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  check("email").isEmail().withMessage("Please provide a valid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  // Controller logic
  async (req, res) => {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: "User already exists" });

      
      user = new User({ username, email, password });
      await user.save();
      res
        .status(201)
        .json({ message: "User registered successfully", userId: user._id });
    } catch (error) {
      console.error("Registration error:", error); // Log the error
      res.status(500).json({ error: "Server error" });
    }
  },
];


exports.login = [
  check("email").isEmail().withMessage("Please provide a valid email"),
  check("password").notEmpty().withMessage("Password is required"),

 
  async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      console.log("Login attempt for email:", email);

      
      const user = await User.findOne({ email });
      if (!user) {
        console.log("User not found");
        return res.status(400).json({ message: "Invalid credentials" });
      }

      console.log("User found:", user);

      
      if (password !== user.password) {
        console.log("Password does not match");
        return res.status(400).json({ message: "Invalid credentials" });
      }

      console.log("Password matches");

      const payload = { user: { id: user._id } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      console.log("Token generated:", token);

      res.json({ token });
    } catch (error) {
      console.error("Login error:", error.message);
      res.status(500).json({ error: "Server error" });
    }
  },
];
