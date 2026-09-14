const Category = require("../models/category.model");
const ActivityLog = require("../models/activityLog.model");

async function createCategory(data) {
  const category = await Category.create(data);

  await ActivityLog.create({
    action: "CREATE_CATEGORY",
    category_id: category._id,
    user_id: data.owner,
    snapshot: category.toObject(),
  });

  return category;
}

async function getAllCategories(ownerId) {
  return await Category.find({
    owner: ownerId,
    archived: false,
  });
}

async function updateCategory(id, data) {
  const oldCategory = await Category.findById(id);

  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (updatedCategory) {
    await ActivityLog.create({
      action: "UPDATE_CATEGORY",
      category_id: updatedCategory._id,
      user_id: data.updated_by || updatedCategory.owner,
      snapshot: updatedCategory.toObject(),
    });
  }

  return updatedCategory;
}

async function deleteCategory(id, userId) {
  const deletedCategory = await Category.findByIdAndDelete(id);

  if (deletedCategory) {
    await ActivityLog.create({
      action: "DELETE_CATEGORY",
      category_id: deletedCategory._id,
      user_id: userId || deletedCategory.owner,
      snapshot: deletedCategory.toObject(),
    });
  }

  return deletedCategory;
}

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};