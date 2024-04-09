const express = require("express");
const {
  authRegisterController,
  testController,
} = require("../controller/authController");
const { requireSignIn } = require("../middleware/authMiddleware");

const router = express.Router();

// user register
router.post("/register", authRegisterController);

// Auth user
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// test for registered user
router.get("/test", requireSignIn, testController);

module.exports = router;
