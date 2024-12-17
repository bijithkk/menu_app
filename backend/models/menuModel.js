import mongoose, { mongo } from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

menuSchema.virtual('items', {
  ref: 'menuitem',
  foreignField: "menuId",
  localField: '_id'
})

const menuModel = mongoose.model("menu", menuSchema);

export default menuModel;
