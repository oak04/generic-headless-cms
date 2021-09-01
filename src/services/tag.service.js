const httpStatus = require('http-status');
const { Tag } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a tag
 * @param {Object} tagBody
 * @returns {Promise<tag>}
 */
const createTag = async (tagBody) => {
  if (await Tag.isNameTaken(tagBody.space, tagBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  const tag = await Tag.create(tagBody);
  return tag;
};

/**
 * Query for tags
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTags = async (filter, options) => {
  const tags = await Tag.paginate(filter, options);
  return tags;
};

/**
 * Get tag by id
 * @param {ObjectId} id
 * @returns {Promise<tag>}
 */
const getTagById = async (id) => {
  return Tag.findById(id);
};

/**
 * Update tag by id
 * @param {ObjectId} tagId
 * @param {Object} updateBody
 * @returns {Promise<tag>}
 */
const updateTagById = async (tagId, updateBody) => {
  const tag = await getTagById(tagId);
  if (!tag) {
    throw new ApiError(httpStatus.NOT_FOUND, 'tag not found');
  }
  if (updateBody.name && (await Tag.isNameTaken(tag.space, updateBody.name, tag.id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  Object.assign(tag, updateBody);
  await tag.save();
  return tag;
};

/**
 * Delete tag by id
 * @param {ObjectId} tagId
 * @returns {Promise<tag>}
 */
const deleteTagById = async (tagId) => {
  const tag = await getTagById(tagId);
  if (!tag) {
    throw new ApiError(httpStatus.NOT_FOUND, 'tag not found');
  }
  await tag.remove();
  return tag;
};

module.exports = {
  createTag,
  queryTags,
  getTagById,
  updateTagById,
  deleteTagById,
};
