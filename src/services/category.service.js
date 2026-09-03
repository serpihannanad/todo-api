const Category = require("../models/category.model");

async function createCategory(data) {
  return await Category.create(data);
}

async function getAllCategories(ownerId) {
  return await Category.find({ owner: ownerId, archived: false });
}

async function updateCategory(id, data) {
  return await Category.findByIdAndUpdate(id, data, { new: true });
}

async function deleteCategory(id) {
  return await Category.findByIdAndDelete(id);
}

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};