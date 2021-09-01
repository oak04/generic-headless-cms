const httpStatus = require('http-status');
const { Field } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a field
 * @param {Object} fieldBody
 * @returns {Promise<field>}
 */
const createFields = async (schema) => {
  const fields = [];
  for (let i = 0; i < schema.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    fields[i] = await Field.create(schema[i]);
  }

  return fields;
};

/**
 * Query for fields
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryFields = async (filter, options) => {
  const fields = await Field.paginate(filter, options);
  return fields;
};

/**
 * Get field by id
 * @param {ObjectId} id
 * @returns {Promise<field>}
 */
const getFieldById = async (id) => {
  return Field.findById(id);
};

/**
 * Update field by id
 * @param {ObjectId} fieldId
 * @param {Object} updateBody
 * @returns {Promise<field>}
 */
const updateFieldById = async (fieldId, updateBody) => {
  const field = await getFieldById(fieldId);
  if (!field) {
    throw new ApiError(httpStatus.NOT_FOUND, 'field not found');
  }
  if (updateBody.name && (await Field.isNameTaken(field.space, updateBody.name, field.id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  Object.assign(field, updateBody);
  await field.save();
  return field;
};

/**
 * Delete field by id
 * @param {ObjectId} fieldId
 * @returns {Promise<field>}
 */
const deleteFieldById = async (fieldId) => {
  const field = await getFieldById(fieldId);
  if (!field) {
    throw new ApiError(httpStatus.NOT_FOUND, 'field not found');
  }
  await field.remove();
  return field;
};

module.exports = {
  createFields,
  queryFields,
  getFieldById,
  updateFieldById,
  deleteFieldById,
};
