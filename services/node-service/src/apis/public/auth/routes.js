const router = require("express").Router();

router.use("/admin", require("./admin/index"));
router.use("/user", require("./user/index"));

module.exports = router;
