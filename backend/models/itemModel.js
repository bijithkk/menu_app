import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  menuId: { type: mongoose.Schema.ObjectId, ref: 'menu' },
  name: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: true },
});

const MenuItem = mongoose.model("menuitem", itemSchema);

export default MenuItem;
