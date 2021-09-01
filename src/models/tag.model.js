const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const tagSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  space: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Space',
  },
});

// add plugin that converts mongoose to json
tagSchema.plugin(toJSON);
tagSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The tag's name
 * @param {ObjectId} [excludeTagId] - The id of the tag to be excluded
 * @param {ObjectId} - The id of the space that contains the type
 * @returns {Promise<boolean>}
 */
tagSchema.statics.isNameTaken = async function (spaceId, name, excludeTagId) {
  const tag = await this.findOne({ space: spaceId, name, _id: { $ne: excludeTagId } });
  return !!tag;
};

/**
 * @typedef Tag
 */
const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
