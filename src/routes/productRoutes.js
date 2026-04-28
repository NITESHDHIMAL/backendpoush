const router = require("express").Router();
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");

// router.post("/", createProduct);
// router.get("/", getProducts);

// router.get("/:id", getProduct);
// router.put("/:id", updateProduct);
// router.delete("/:id", deleteProduct);


// Public
router.get("/", getProducts);
router.get("/:id", getProduct);

// Admin only
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);


module.exports = router;

