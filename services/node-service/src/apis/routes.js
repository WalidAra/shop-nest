const router = require("express").Router();

router.use("/public", require("./public/index"));
router.use("/private", require("./private/index"));
router.get("/health", (req, res) => {
  try {
    res.status(200).json({
      status: true,
      message: "API is healthy",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      status: false,
      data: error.message,
    });
  }
});

module.exports = router;
