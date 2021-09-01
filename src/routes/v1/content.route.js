/* eslint-disable prettier/prettier */
const express = require('express');
const contentController = require('../../controllers/content.controller');

const router = express.Router();

router
  .route('/')
  .post(contentController.createContent)
  .get(contentController.getContents);

router
  .route('/:contentId')
  .get(contentController.getContent)
  .patch(contentController.updateContent)
  .delete(contentController.deleteContent);

module.exports = router;
