const { Router } = require('express');
const { login } = require("../Controllers/authControllers");
const { checkUser } = require("../Middlewares/authMiddleware");

const router = Router();

router.post("/", checkUser);
router.post("/login", login);

module.exports = router;