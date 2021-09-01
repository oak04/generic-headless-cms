/* eslint-disable prettier/prettier */
const express = require('express');
const roleController = require('../../controllers/role.controller');

const router = express.Router();

router
  .route('/')
  .post(roleController.createRole)
  .get(roleController.getRoles);

router
  .route('/:roleId')
  .get(roleController.getRole)
  .patch(roleController.updateRole)
  .delete(roleController.deleteRole);

module.exports = router;
