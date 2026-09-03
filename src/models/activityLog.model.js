const mongoose = require("mongoose");
const activityLogSchema = new mongoose.Schema({
  action: String, // CREATE, UPDATE, DELETE
  todo_id: mongoose.Schema.Types.ObjectId,
  user_id: mongoose.Schema.Types.ObjectId,
  created_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model("ActivityLog", activityLogSchema);