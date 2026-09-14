const categoryService = require("../services/category.service");

const catchAsync = require("../utils/catchAsync");

const createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory({
    ...req.body,
    owner: req.user._id,
    created_by: req.user._id,
  });

  res.status(201).json({
    success: true,
    data: category,
  });
});

const getCategories = catchAsync(async (req, res) => {
  const categories = await categoryService.getAllCategories(req.user._id);

  res.status(200).json({
    success: true,
    data: categories,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const category = await categoryService.updateCategory(
    req.params.id,
    {
      ...req.body,
      updated_by: req.user._id,
    }
  );

  res.status(200).json({
    success: true,
    data: category,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  await categoryService.deleteCategory(
    req.params.id,
    req.user._id
  );

  res.status(204).send();
});
module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};