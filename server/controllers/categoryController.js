const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Category = require("../models/category");

// Display list of all Categories.
exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({}, { name: 1, description: 1 })
    .sort({ name: 1 })
    .exec();

  res.json(allCategories);
});

// Display one Category
exports.category_detail = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();

  if (category === null) {
    // No results.
    res.redirect("/categories");
  }

  res.json(category);
});

// Handle Category create on POST.
exports.category_create_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Name must have at least 3 characters.")
    .isAlphanumeric()
    .withMessage("Name has non-alphanumeric characters."),
  body("description")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Description must have at least 3 characters.")
    .isAlphanumeric()
    .withMessage("Description has non-alphanumeric characters."),
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    console.log("received post request");
    // Create Category object with escaped and trimmed data
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.json({
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      // Save category.
      //TODO await category.save();

      // Send a valid response
      res.json(category.url);
    }
  }),
];

// Handle Category delete on POST.
// TODO: Add validation
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  const category = Category.findById(req.params.id).exec();
  await Category.findByIdAndRemove(req.body.categoryid);
  res.redirect("/categories");
});

// Handle Category update on POST.
exports.category_update_post = asyncHandler(async (req, res, next) => {
  // Create a Category object with escaped/trimmed data and old id.
  const category = new Category({
    name: req.body.name,
    description: req.body.description,
  });

  await Category.findByIdAndUpdate(req.params.id, category, {});
  res.redirect(category.url);
});
