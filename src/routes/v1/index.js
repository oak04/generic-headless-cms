const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const spaceRoute = require('./space.route');
const contentRoute = require('./content.route');
const roleRoute = require('./role.route');
const statusRoute = require('./status.route');
const tagRoute = require('./tag.route');
const typeRoute = require('./type.route');
const fieldRoute = require('./field.route');

const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/spaces',
    route: spaceRoute,
  },
  {
    path: '/content',
    route: contentRoute,
  },
  {
    path: '/types',
    route: typeRoute,
  },
  {
    path: '/statuses',
    route: statusRoute,
  },
  {
    path: '/roles',
    route: roleRoute,
  },
  {
    path: '/tags',
    route: tagRoute,
  },
  {
    path: '/fields',
    route: fieldRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
