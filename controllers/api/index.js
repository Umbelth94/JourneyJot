const router = require("express").Router();
const userRoutes = require("./userRoutes.js");

//Route for any user related API data (logging in, logging out)
router.use("/user", userRoutes);

module.exports = router;
