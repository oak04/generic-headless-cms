const types = ['admin', 'superAdmin'];

const typeRights = new Map();
typeRights.set(types[0], []);
typeRights.set(types[1], ['getUsers', 'manageUsers']);

module.exports = {
  types,
  typeRights,
};
