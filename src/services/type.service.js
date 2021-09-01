const httpStatus = require('http-status');
const { Type } = require('../models');
const ApiError = require('../utils/ApiError');
/**
 * Create a type
 * @param {Object} typeBody
 * @returns {Promise<type>}
 */
const createType = async (typeBody, schema) => {
  if (await Type.isNameTaken(typeBody.space, typeBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }

  const type = await Type.create({ ...typeBody, schema });
  return type;
};

/**
 * Query for types
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTypes = async (filter, options) => {
  const types = await Type.paginate(filter, options);
  return types;
};

/**
 * Get type by id
 * @param {ObjectId} id
 * @returns {Promise<type>}
 */
const getTypeById = async (id) => {
  return Type.findById(id);
};

/**
 * Update type by id
 * @param {ObjectId} typeId
 * @param {Object} updateBody
 * @returns {Promise<type>}
 */
const updateTypeById = async (typeId, updateBody) => {
  const type = await getTypeById(typeId);
  if (!type) {
    throw new ApiError(httpStatus.NOT_FOUND, 'type not found');
  }
  if (updateBody.name && (await Type.isNameTaken(type.space, updateBody.name, type._id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }

  Object.assign(type, updateBody);

  await type.save();
  return type;
};

/**
 * Delete type by id
 * @param {ObjectId} typeId
 * @returns {Promise<type>}
 */
const deleteTypeById = async (typeId) => {
  const type = await getTypeById(typeId);
  if (!type) {
    throw new ApiError(httpStatus.NOT_FOUND, 'type not found');
  }
  await type.remove();
  return type;
};

module.exports = {
  createType,
  queryTypes,
  getTypeById,
  updateTypeById,
  deleteTypeById,
};
