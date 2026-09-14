const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },

    todo_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
      default: null,
    },

    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    snapshot: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    created_at: {
      type: Date,
      default: Date.now,
    },
  }
);

module.exports = mongoose.model("ActivityLog", activityLogSchema);