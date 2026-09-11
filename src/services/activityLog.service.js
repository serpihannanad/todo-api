const ActivityLog = require("../models/activityLog.model");

const getActivityLogs = async () => {
  return await ActivityLog.find()
    .sort({ created_at: -1 });
};

module.exports = {
  getActivityLogs,
};