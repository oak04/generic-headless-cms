const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { contentService } = require('../services');

const createContent = catchAsync(async (req, res) => {
  const content = await contentService.createContent(req.body);
  res.status(httpStatus.CREATED).send(content);
});

const getContents = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['space', 'type', 'tags_list', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await contentService.queryContents(filter, options);
  res.send(result);
});

const getContent = catchAsync(async (req, res) => {
  const content = await contentService.getContentById(req.params.contentId);
  if (!content) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Content not found');
  }
  res.send(content);
});

const updateContent = catchAsync(async (req, res) => {
  const content = await contentService.updateContentById(req.params.contentId, req.body);
  res.send(content);
});

const deleteContent = catchAsync(async (req, res) => {
  await contentService.deleteContentById(req.params.contentId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createContent,
  getContents,
  getContent,
  updateContent,
  deleteContent,
};
