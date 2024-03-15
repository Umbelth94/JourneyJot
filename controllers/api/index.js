const router = require("express").Router();
const userRoutes = require("./userRoutes.js");
const journeyRoutes = require("./journeyRoutes");
const commentRoutes = require("./commentRoutes");

//Route for any user related API data (logging in, logging out)
router.use("/user", userRoutes);
router.use("/journeys", journeyRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
