const express = require('express');
const authRoute = require('./authRoutes');
const mainRoute = require('./mainRoutes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/main',
    route: mainRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;