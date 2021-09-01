const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const fieldSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  field: {
    type: String,
    enum: ['text', 'longText', 'list', 'number', 'date', 'url'],
    default: 'text',
  },
  position: Number,
  required: Boolean,
  description: String,
  regex: String,
  rtl: Boolean,
});

// add plugin that converts mongoose to json
fieldSchema.plugin(toJSON);

/**
 * @typedef Field
 */
const Field = mongoose.model('Field', fieldSchema);

module.exports = Field;
