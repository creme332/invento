#! /usr/bin/env node

/**
 * This script populates some items and categories to your database.
 *
 *  Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/invento?retryWrites=true&w=majority"
 *
 * Reference: MDN
 */

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Category = require("./models/category");

const items = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createItems();
  await createCategories();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoryCreate(index, name, description) {
  const category = new Category({ name: name, description: description });
  await category.save();
  categories[index] = category;
  console.log(`Added genre: ${name}`);
}

async function itemCreate(
  index,
  name,
  description,
  status,
  stock,
  price,
  category,
  image = false
) {
  const item_ = {
    name: name,
    description: description,
    status: status,
    stock: stock,
    price: price,
    category: category,
  };
  if (image != false) item_.image = image;

  const item = new Item(item_);

  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, "Electronics"),
    categoryCreate(1, "Clothing"),
    categoryCreate(2, "Groceries"),
    categoryCreate(3, "Books"),
    categoryCreate(4, "Home Decor"),
    categoryCreate(5, "Toys"),
    categoryCreate(6, "Furniture"),
    categoryCreate(7, "Tools"),
    categoryCreate(8, "Sports Equipment"),
  ]);
}

async function createItems() {
  console.log("Adding items");
  await Promise.all([
    itemCreate(
      0,
      "Smartphone",
      "A high-end smartphone with advanced features",
      "Available",
      20,
      899.99,
      categories[0]
    ),
    itemCreate(
      1,
      "T-shirt",
      "A comfortable cotton T-shirt",
      "Available",
      50,
      25.99,
      categories[1]
    ),
    itemCreate(
      2,
      "Milk",
      "Fresh cow milk",
      "Available",
      100,
      2.99,
      categories[2]
    ),
    itemCreate(
      3,
      "The Great Gatsby",
      "A classic novel by F. Scott Fitzgerald",
      "Available",
      30,
      12.49,
      categories[3]
    ),
    itemCreate(
      4,
      "Decorative Vase",
      "A handcrafted decorative vase",
      "Available",
      15,
      69.99,
      categories[4]
    ),
    itemCreate(
      5,
      "Lego Set",
      "A creative Lego building set for kids",
      "Available",
      40,
      49.99,
      categories[5]
    ),
    itemCreate(
      6,
      "Sofa",
      "A comfortable 3-seater sofa",
      "Available",
      5,
      599.99,
      categories[6]
    ),
    itemCreate(
      7,
      "Hammer",
      "A sturdy hammer for household repairs",
      "Available",
      25,
      9.99,
      categories[7]
    ),
    itemCreate(
      8,
      "Yoga Mat",
      "A high-quality yoga mat for exercise",
      "Available",
      30,
      29.99,
      categories[8]
    ),
  ]);
}
