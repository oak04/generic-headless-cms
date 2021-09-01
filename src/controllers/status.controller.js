const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { statusService } = require('../services');

const createStatus = catchAsync(async (req, res) => {
  const status = await statusService.createStatus(req.body);
  res.status(httpStatus.CREATED).send(status);
});

const getStatuses = catchAsync(async (req, res) => {
  const filter = {};
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await statusService.queryStatuses(filter, options);
  res.send(result);
});

const getStatus = catchAsync(async (req, res) => {
  const status = await statusService.getStatusById(req.params.statusId);
  if (!status) {
    throw new ApiError(httpStatus.NOT_FOUND, 'status not found');
  }
  res.send(status);
});

const updateStatus = catchAsync(async (req, res) => {
  const status = await statusService.updateStatusById(req.params.statusId, req.body);
  res.send(status);
});

const deleteStatus = catchAsync(async (req, res) => {
  await statusService.deleteStatusById(req.params.statusId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createStatus,
  getStatuses,
  getStatus,
  updateStatus,
  deleteStatus,
};
