const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const statusSchema = mongoose.Schema({
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
  publisher: {
    type: Boolean,
    default: false,
  },
});

// add plugin that converts mongoose to json
statusSchema.plugin(toJSON);
statusSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The status's name
 * @param {ObjectId} [excludeStatusId] - The id of the status to be excluded
 * @returns {Promise<boolean>}
 */
statusSchema.statics.isNameTaken = async function (spaceId, name, excludeStatusId) {
  const status = await this.findOne({ space: spaceId, name, _id: { $ne: excludeStatusId } });
  return !!status;
};

/**
 * @typedef Status
 */
const Status = mongoose.model('Status', statusSchema);

module.exports = Status;
