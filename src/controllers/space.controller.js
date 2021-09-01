const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { spaceService } = require('../services');

const createSpace = catchAsync(async (req, res) => {
  // console.log(req.body);
  const space = await spaceService.createSpace(req.body);
  res.status(httpStatus.CREATED).send(space);
});

const getSpaces = catchAsync(async (req, res) => {
  const filter = {};
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await spaceService.querySpaces(filter, options);
  res.send(result);
});

const getSpace = catchAsync(async (req, res) => {
  const space = await spaceService.getSpaceById(req.params.spaceId);
  if (!space) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Space not found');
  }
  res.send(space);
});

const updateSpace = catchAsync(async (req, res) => {
  const space = await spaceService.updateSpaceById(req.params.spaceId, req.body);
  res.send(space);
});

const deleteSpace = catchAsync(async (req, res) => {
  await spaceService.deleteSpaceById(req.params.spaceId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createSpace,
  getSpaces,
  getSpace,
  updateSpace,
  deleteSpace,
};
