const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true, maxLength: 100, minLength: 3 },
  description: { type: String, maxLength: 100 },
});

// Virtual for category's URL
CategorySchema.virtual("url").get(function () {
  return `/category/${this._id}`;
});

// Export model
module.exports = mongoose.model("Category", CategorySchema);
