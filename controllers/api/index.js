const router = require("express").Router();
const userRoutes = require("./userRoutes.js");
const journeyRoutes = require("./journeyRoutes");
const gptRoutes = require("./gptRoutes.js");
const commentRoutes = require("./commentRoutes");

//Route for any user related API data (logging in, logging out)
router.use("/user", userRoutes);
router.use("/journeys", journeyRoutes);
router.use("/comments", commentRoutes);
router.use("/gpt", gptRoutes);

module.exports = router;
