const { adminRegister, adminLogin } = require("../controller");

const router = require("express").Router();

router.post("/login", adminLogin);
router.post("/register", adminRegister);

module.exports = router;
