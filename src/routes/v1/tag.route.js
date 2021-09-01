/* eslint-disable prettier/prettier */
const express = require('express');
const tagController = require('../../controllers/tag.controller');

const router = express.Router();

router
  .route('/')
  .post(tagController.createTag)
  .get(tagController.getTags);

router
  .route('/:tagId')
  .get(tagController.getTag)
  .patch(tagController.updateTag)
  .delete(tagController.deleteTag);

module.exports = router;
