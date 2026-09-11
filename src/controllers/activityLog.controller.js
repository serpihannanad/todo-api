const activityLogService = require("../services/activityLog.service");

const catchAsync = require("../utils/catchAsync");

const getActivityLogs = catchAsync(async (req, res) => {
  const logs = await activityLogService.getActivityLogs();

  res.status(200).json({
    success: true,
    data: logs,
  });
});

module.exports = {
  getActivityLogs,
};