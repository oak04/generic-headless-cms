const httpStatus = require('http-status');
const { Space } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a space
 * @param {Object} spaceBody
 * @returns {Promise<Space>}
 */
const createSpace = async (spaceBody) => {
  if (await Space.isNameTaken(spaceBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  const space = await Space.create(spaceBody);
  return space;
};

/**
 * Query for spaces
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySpaces = async (filter, options) => {
  const spaces = await Space.paginate(filter, options);
  return spaces;
};

/**
 * Get space by id
 * @param {ObjectId} id
 * @returns {Promise<space>}
 */
const getSpaceById = async (id) => {
  return Space.findById(id);
};

/**
 * Update space by id
 * @param {ObjectId} spaceId
 * @param {Object} updateBody
 * @returns {Promise<space>}
 */
const updateSpaceById = async (spaceId, updateBody) => {
  const space = await getSpaceById(spaceId);
  if (!space) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Space not found');
  }
  if (updateBody.name && (await Space.isNameTaken(updateBody.name, spaceId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  Object.assign(space, updateBody);
  await space.save();
  return space;
};

/**
 * Delete space by id
 * @param {ObjectId} spaceId
 * @returns {Promise<space>}
 */
const deleteSpaceById = async (spaceId) => {
  const space = await getSpaceById(spaceId);
  if (!space) {
    throw new ApiError(httpStatus.NOT_FOUND, 'space not found');
  }
  await space.remove();
  return space;
};

module.exports = {
  createSpace,
  querySpaces,
  getSpaceById,
  updateSpaceById,
  deleteSpaceById,
};
