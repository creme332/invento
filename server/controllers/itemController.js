const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Item = require("../models/item");

// Display statistics of Items.
exports.item_by_category = asyncHandler(async (req, res, next) => {
  // get number of items for each category
  const groupItemsByCategory = await Item.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $group: {
        _id: "$category.name",
        totalItems: { $count: {} },
      },
    },
    {
      $project: {
        _id: 0,
        category: { $first: "$_id" },
        totalItems: 1,
      },
    },
  ]);
  res.json(groupItemsByCategory);
});

exports.item_by_status = asyncHandler(async (req, res, next) => {
  // get number of items for each status
  const groupItemsByStatus = await Item.aggregate([
    {
      $group: {
        _id: "$status",
        totalItems: { $count: {} },
      },
    },
    {
      $project: {
        _id: 0,
        status: "$_id",
        totalItems: 1,
      },
    },
  ]);
  res.json(groupItemsByStatus);
});

// Display list of all Items.
exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find().sort({ name: 1 }).exec();
  res.json(allItems);
});

// Display one Item
exports.item_detail = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);
  const item = await Item.findById(req.params.id).exec();
  res.json(item);
});

// Handle Item create on POST.
exports.item_create_post = [
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

    // Create Item object with escaped and trimmed data
    const itemDict = {
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      stock: req.body.stock,
      image: req.body.image,
      price: req.body.price,
      category: req.body.category,
    };
    if (itemDict.image) {
      itemDict.image = req.body.image;
    }
    const item = new Item(itemDict);

    if (!errors.isEmpty()) {
      res.json({
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      // Save item.
      await item.save();
      // Redirect to new item record.
      res.redirect(item.url);
    }
  }),
];

// Handle Item delete on POST.
// TODO: Add validation
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  const item = Item.findById(req.params.id).exec();
  await Item.findByIdAndRemove(req.body.itemid);
  res.redirect("/items");
});

// Handle Item update on POST.
exports.item_update_post = asyncHandler(async (req, res, next) => {
  // Create a Item object with escaped/trimmed data and old id.
  const item = new Item({
    name: req.body.name,
    description: req.body.description,
  });

  await Item.findByIdAndUpdate(req.params.id, item, {});
  res.redirect(item.url);
});
