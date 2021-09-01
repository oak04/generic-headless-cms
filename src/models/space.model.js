const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const spaceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
spaceSchema.plugin(toJSON);
spaceSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The space's name
 * @param {ObjectId} [excludeSpaceId] - The id of the space to be excluded
 * @returns {Promise<boolean>}
 */
spaceSchema.statics.isNameTaken = async function (name, excludeSpaceId) {
  const space = await this.findOne({ name, _id: { $ne: excludeSpaceId } });
  return !!space;
};

/**
 * @typedef Space
 */
const Space = mongoose.model('Space', spaceSchema);

module.exports = Space;
