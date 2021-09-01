const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const roleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  space: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Space',
  },
  permissions: {
    view: [mongoose.SchemaTypes.ObjectId],
    update_content: [mongoose.SchemaTypes.ObjectId],
    update_to_status: [mongoose.SchemaTypes.ObjectId],
    publish: [mongoose.SchemaTypes.ObjectId],
  },
});

// add plugin that converts mongoose to json
roleSchema.plugin(toJSON);
roleSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The role's name
 * @param {ObjectId} [excludeRoleId] - The id of the role to be excluded
 * @returns {Promise<boolean>}
 */
roleSchema.statics.isNameTaken = async function (spaceId, name, excludeRoleId) {
  const role = await this.findOne({ space: spaceId, name, _id: { $ne: excludeRoleId } });
  return !!role;
};

/**
 * @typedef Role
 */
const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
