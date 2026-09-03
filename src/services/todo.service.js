const Todo = require("../models/todo.model");

async function createTodo(data) {
  const todo = new Todo({
    title: data.title,
    description: data.description,
    owner: data.owner,
    created_by: data.created_by,
    updated_by: data.updated_by,
  });

  return await todo.save();
};

async function getAllTodos(ownerId, queryOptions) {
  const {
    page = 1,
    limit = 10,
    completed,
    sortBy = "created_at",
    order = "desc",
  } = queryOptions;

  // Deklarasi filter langsung di sini (tanpa dibungkus function lagi)
  const filter = {
    owner: ownerId,
    archived: false,
  };

  // Filter berdasarkan status completed, hanya jika parameter dikirim
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

  const totalPages = Math.ceil(totalItems / Number(limit));

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
  

  // Filter berdasarkan status completed, hanya jika parameter dikirim
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

  const totalPages = Math.ceil(totalItems / Number(limit));

  return {
    todos,
    pagination: {
      currentPage: Number(page),
      totalPages,
      totalItems,
      itemsPerPage: Number(limit),
    },
  };

async function getAllTodosForAdmin(queryOptions) {
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

  const totalPages = Math.ceil(totalItems / Number(limit));

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
  return await Todo.findByIdAndUpdate(
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
}
async function deleteTodo(id) {
  return await Todo.findByIdAndDelete(id);
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