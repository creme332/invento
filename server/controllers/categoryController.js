const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Category = require("../models/category");
const Item = require("../models/item");

// Display list of all Categories.

exports.category_total = asyncHandler(async (req, res, next) => {
  const total = await Category.find().count().exec();
  res.json(total);
});


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
    .withMessage("Name must have at least 3 characters."),
  body("description")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Description must have at least 3 characters."),
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Check for errors in received data. If so, send error messages
    if (!errors.isEmpty()) {
      res.writeHead(
        400,
        `${errors
          .array()
          .map((e) => e.msg)
          .join()}`
      );
      return res.send();
    }

    // Check if category name is unique
    const existingCategory = Category.find({ name: req.body.name }).exec();
    if (existingCategory.length > 0) {
      res.writeHead(403, `Category ${req.body.name} already exists.`);
      return res.send();
    }

    // Create Category object with escaped and trimmed data
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    // Save to Mongo
    try {
      await category.save();
      return res.send("success");
    } catch (error) {
      res.writeHead(500, `${error}`);
      res.send();
    }
  }),
];

// Handle Category delete on POST.
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  // fetch category and items having that category
  const [category, items] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).exec(),
  ]);

  // check if category exists
  if (!category) {
    res.writeHead(400, "Category does not exist", {
      "content-type": "application/json",
    });
    return res.send();
  }

  // prevent deletion of a category if an item uses that category
  if (items.length > 0) {
    res.writeHead(
      403,
      `Cannot delete a category that is used by the following items: ${items
        .map((e) => e.name)
        .join()} `,
      {
        "content-type": "application/json",
      }
    );
    return res.send();
  }

  try {
    // category exists and is unused so delete it
    await Category.findByIdAndRemove(req.params.id);
    return res.send("success");
  } catch (err) {
    res.writeHead(500, `${error}`);
    res.send();
  }
});

// Handle Category update on POST.
exports.category_update_post = asyncHandler(async (req, res, next) => {
  // Create a Category object with escaped/trimmed data and old id.
  const category = new Category({
    _id: req.params.id,
    name: req.body.name,
    description: req.body.description,
  });

  try {
    // category exists and is unused so delete it
    await Category.findByIdAndUpdate(req.params.id, category, {});
    res.send("success");
  } catch (err) {
    res.writeHead(500, `${err}`);
    res.send();
  }
});
