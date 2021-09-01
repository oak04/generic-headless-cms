/* eslint-disable prettier/prettier */
const express = require('express');
const statusController = require('../../controllers/status.controller');

const router = express.Router();

router
  .route('/')
  .post(statusController.createStatus)
  .get(statusController.getStatuses);

router
  .route('/:statusId')
  .get(statusController.getStatus)
  .patch(statusController.updateStatus)
  .delete(statusController.deleteStatus);

module.exports = router;
