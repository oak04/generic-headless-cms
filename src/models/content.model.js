const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const contentSchema = mongoose.Schema(
  {
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
    tags_list: [
      {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    data: {
      type: mongoose.SchemaTypes.Mixed,
      required: true,
    },
    published: Boolean,
    author: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    type: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Type',
    },
    status: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Status',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
contentSchema.plugin(toJSON);
contentSchema.plugin(paginate);

/**
 * @typedef Content
 */
const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
