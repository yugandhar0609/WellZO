const express = require("express");
const router = express.Router();
const UserRoute = require("./user.route");
const EarlyAccessRoute = require("./earlyAccess.route");

const Routes = [
  {
    path: "/user",
    route: UserRoute,
  },
  {
    path: "/early-access",
    route: EarlyAccessRoute,
  },
];

Routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
