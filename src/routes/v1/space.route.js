/* eslint-disable prettier/prettier */
const express = require('express');
const spaceController = require('../../controllers/space.controller');

const router = express.Router();

router
  .route('/')
  .post(spaceController.createSpace)
  .get(spaceController.getSpaces);

router
  .route('/:spaceId')
  .get(spaceController.getSpace)
  .patch(spaceController.updateSpace)
  .delete(spaceController.deleteSpace);

module.exports = router;
