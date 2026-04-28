const Product = require("../models/Product");

// Create product
exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};

// Get all products
// exports.getProducts = async (req, res) => {
//   const products = await Product.find();
//   res.json(products);
// };

// GET products with search, filter, pagination
exports.getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const category = req.query.category
      ? { category: req.query.category }
      : {};

    const priceFilter = req.query.minPrice || req.query.maxPrice
      ? {
        price: {
          ...(req.query.minPrice && { $gte: Number(req.query.minPrice) }),
          ...(req.query.maxPrice && { $lte: Number(req.query.maxPrice) }),
        },
      }
      : {};

    const query = {
      ...keyword,
      ...category,
      ...priceFilter,
    };

    const count = await Product.countDocuments(query);

    const products = await Product.find(query)
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({ createdAt: -1 });

    res.json({
      page,
      totalPages: Math.ceil(count / limit),
      totalProducts: count,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Get single product
exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

// Update product
exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
};

// Delete product
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};