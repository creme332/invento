const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 100, minLength: 3 },
  description: { type: String, required: true, maxLength: 100 },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Maintenance", "Loaned", "Reserved"],
    default: "Available",
  },
  stock: { type: Number, required: true, default: 0, min: 0 },
  image: { type: Object, default: {} },
  price: { type: Number, required: true, default: 0, min: 0 },
  category: { type: Schema.Types.ObjectId, required: true, ref: "Category" }, // reference to the associated category
});

// an item can have multiple categories

// Virtual for item's URL
ItemSchema.virtual("url").get(function () {
  return `/item/${this._id}`;
});

// Export model
module.exports = mongoose.model("Item", ItemSchema);
