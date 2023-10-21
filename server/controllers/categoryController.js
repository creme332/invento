const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Category = require("../models/category");
const Item = require("../models/item");

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
      res.writeHead(440, `${JSON.stringify()(errors.array())}`);
      res.send();
    } else {
      // Data from form is valid.
      // TODO: Check if category name is unique
      try {
        // Save category.
        await category.save();
        // Send a valid response
        res.json(category.url);
      } catch (error) {
        res.writeHead(440, `${error}`);
        res.send();
      }
    }
  }),
];

// Handle Category delete on POST.
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  const [category, items] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).exec(),
  ]);

  // check if category exists
  if (!category) {
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  if (items.length > 0) {
    // prevent deletion of a category if an item uses that category
    res.writeHead(440, "Cannot delete a category that is used by an item.", {
      "content-type": "application/json",
    });
    res.send();
    // res.send({ error: , items: items });
  } else {
    try {
      // category exists and is unused so delete it
      await Category.findByIdAndRemove(req.params.id);
      res.redirect("/categories");
    } catch (err) {
      console.log(err);
    }
  }
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
