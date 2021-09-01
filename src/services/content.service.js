const httpStatus = require('http-status');
const { Content } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a content
 * @param {Object} contentBody
 * @returns {Promise<Content>}
 */
const createContent = async (contentBody) => {
  //  if (await Content.isNameTaken(contentBody.name)) {
  //    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  //  }
  const content = await Content.create(contentBody);
  return content;
};

/**
 * Query for contents
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryContents = async (filter, options) => {
  const contents = await Content.paginate(filter, options);
  return contents;
};

/**
 * Get content by id
 * @param {ObjectId} id
 * @returns {Promise<content>}
 */
const getContentById = async (id) => {
  return Content.findById(id);
};

/**
 * Update content by id
 * @param {ObjectId} contentId
 * @param {Object} updateBody
 * @returns {Promise<Content>}
 */
const updateContentById = async (contentId, updateBody) => {
  const content = await getContentById(contentId);
  if (!content) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Content not found');
  }
  // if (updateBody.name && (await Content.isNameTaken(updateBody.name, contentId))) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  // }
  Object.assign(content, updateBody);
  await content.save();
  return content;
};

/**
 * Delete content by id
 * @param {ObjectId} contentId
 * @returns {Promise<Content>}
 */
const deleteContentById = async (contentId) => {
  const content = await getContentById(contentId);
  if (!content) {
    throw new ApiError(httpStatus.NOT_FOUND, 'content not found');
  }
  await content.remove();
  return content;
};

module.exports = {
  createContent,
  queryContents,
  getContentById,
  updateContentById,
  deleteContentById,
};
