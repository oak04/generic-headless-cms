const httpStatus = require('http-status');
const { Status } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a status
 * @param {Object} statusBody
 * @returns {Promise<status>}
 */
const createStatus = async (statusBody) => {
  if (await Status.isNameTaken(statusBody.space, statusBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  const status = await Status.create(statusBody);
  return status;
};

/**
 * Query for statuses
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryStatuses = async (filter, options) => {
  const statuses = await Status.paginate(filter, options);
  return statuses;
};

/**
 * Get status by id
 * @param {ObjectId} id
 * @returns {Promise<status>}
 */
const getStatusById = async (id) => {
  return Status.findById(id);
};

/**
 * Update status by id
 * @param {ObjectId} statusId
 * @param {Object} updateBody
 * @returns {Promise<Status>}
 */
const updateStatusById = async (statusId, updateBody) => {
  const status = await getStatusById(statusId);
  if (!status) {
    throw new ApiError(httpStatus.NOT_FOUND, 'status not found');
  }
  if (updateBody.name && (await Status.isNameTaken(status.space, updateBody.name, status.id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  Object.assign(status, updateBody);
  await status.save();
  return status;
};

/**
 * Delete status by id
 * @param {ObjectId} statusId
 * @returns {Promise<status>}
 */
const deleteStatusById = async (statusId) => {
  const status = await getStatusById(statusId);
  if (!status) {
    throw new ApiError(httpStatus.NOT_FOUND, 'status not found');
  }
  await status.remove();
  return status;
};

module.exports = {
  createStatus,
  queryStatuses,
  getStatusById,
  updateStatusById,
  deleteStatusById,
};
