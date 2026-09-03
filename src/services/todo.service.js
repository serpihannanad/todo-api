const Todo = require("../models/todo.model");
const ActivityLog = require("../models/activityLog.model"); // 1. Import model ActivityLog

async function createTodo(data) {
  const todo = new Todo({
    title: data.title,
    description: data.description,
    owner: data.owner,
    created_by: data.created_by,
    updated_by: data.updated_by,
  });

  const savedTodo = await todo.save();

  // 2. Log aktivitas saat Todo dibuat
  await ActivityLog.create({
    action: "CREATE_TODO",
    todo_id: savedTodo._id,
    user_id: data.owner,
  });

  return savedTodo;
}

async function getAllTodos(ownerId, queryOptions = {}) {
  const {
    search,
    page = 1,
    limit = 10,
    completed,
    sortBy = "created_at",
    order = "desc",
  } = queryOptions;

  const filter = {
    archived: false,
  };

  if (ownerId) {
    filter.owner = ownerId;
  }
  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }
  if (completed !== undefined) {
    filter.completed = completed === "true";
  }

  const sortDirection = order === "asc" ? 1 : -1;
  const skip = (Number(page) - 1) * Number(limit);

  const [todos, totalItems] = await Promise.all([
    Todo.find(filter)
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(Number(limit)),
    Todo.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalItems / Number(limit)) || 1;

  return {
    todos,
    pagination: {
      currentPage: Number(page),
      totalPages,
      totalItems,
      itemsPerPage: Number(limit),
    },
  };
}

async function getAllTodosForAdmin(queryOptions = {}) {
  const {
    page = 1,
    limit = 10,
    completed,
    sortBy = "created_at",
    order = "desc",
  } = queryOptions;

  const filter = {
    archived: false,
  };

  if (completed !== undefined) {
    filter.completed = completed === "true";
  }

  const sortDirection = order === "asc" ? 1 : -1;
  const skip = (Number(page) - 1) * Number(limit);

  const [todos, totalItems] = await Promise.all([
    Todo.find(filter)
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(Number(limit))
      .populate("owner", "name email"),
    Todo.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalItems / Number(limit)) || 1;

  return {
    todos,
    pagination: {
      currentPage: Number(page),
      totalPages,
      totalItems,
      itemsPerPage: Number(limit),
    },
  };
}

async function getTodoById(id) {
  return await Todo.findById(id);
}

async function updateTodo(id, data) {
  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    {
      title: data.title,
      description: data.description,
      completed: data.completed,
      archived: data.archived,
      updated_by: data.updated_by,
    },
    { new: true, runValidators: true }
  );

  // 3. Log aktivitas saat Todo diubah
  if (updatedTodo) {
    await ActivityLog.create({
      action: "UPDATE_TODO",
      todo_id: updatedTodo._id,
      user_id: data.updated_by,
    });
  }

  return updatedTodo;
}

async function deleteTodo(id, userId) {
  const deletedTodo = await Todo.findByIdAndDelete(id);

  // 4. Log aktivitas saat Todo dihapus
  if (deletedTodo) {
    await ActivityLog.create({
      action: "DELETE_TODO",
      todo_id: deletedTodo._id,
      user_id: userId || deletedTodo.owner,
    });
  }

  return deletedTodo;
}

async function getSummaryStats() {
  const totalTodos = await Todo.countDocuments();
  const completedTodos = await Todo.countDocuments({ completed: true });
  const pendingTodos = totalTodos - completedTodos;

  return { totalTodos, completedTodos, pendingTodos };
}

module.exports = {
  createTodo,
  getAllTodos,
  getAllTodosForAdmin,
  getTodoById,
  updateTodo,
  deleteTodo,
  getSummaryStats,
};