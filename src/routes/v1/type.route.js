/* eslint-disable prettier/prettier */
const express = require('express');
const typeController = require('../../controllers/type.controller');

const router = express.Router();

router
  .route('/')
  .post(typeController.createType)
  .get(typeController.getTypes);

router
  .route('/:typeId')
  .get(typeController.getType)
  .patch(typeController.updateType)
  .delete(typeController.deleteType);

module.exports = router;
