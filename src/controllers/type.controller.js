const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { typeService, fieldService } = require('../services');

const createType = catchAsync(async (req, res) => {
  const fields = await fieldService.createFields(req.body.schema);
  const type = await typeService.createType(req.body, fields);
  res.status(httpStatus.CREATED).send(type);
});

const getTypes = catchAsync(async (req, res) => {
  const filter = { space: req.query.spaceId };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await typeService.queryTypes(filter, options);
  res.send(result);
});

const getType = catchAsync(async (req, res) => {
  const type = await typeService.getTypeById(req.params.typeId);
  if (!type) {
    throw new ApiError(httpStatus.NOT_FOUND, 'type not found');
  }
  res.send(type);
});

const updateType = catchAsync(async (req, res) => {
  const type = await typeService.updateTypeById(req.params.typeId, req.body);
  res.send(type);
});

const deleteType = catchAsync(async (req, res) => {
  await typeService.deleteTypeById(req.params.typeId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createType,
  getTypes,
  getType,
  updateType,
  deleteType,
};
