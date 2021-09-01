const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const typeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  schema: [
    {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Field',
    },
  ],
  space: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Space',
  },
});

// add plugin that converts mongoose to json
typeSchema.plugin(toJSON);
typeSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The type's name
 * @param {ObjectId} [excludeTypeId] - The id of the type to be excluded
 * @param {ObjectId} - The id of the space that contains the type
 * @returns {Promise<boolean>}
 */
typeSchema.statics.isNameTaken = async function (spaceId, name, excludeTypeId) {
  const type = await this.findOne({ space: spaceId, name, _id: { $ne: excludeTypeId } });
  return !!type;
};

/**
 * @typedef Type
 */
const Type = mongoose.model('Type', typeSchema);

module.exports = Type;
