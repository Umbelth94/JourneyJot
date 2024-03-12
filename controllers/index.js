const router = require("express").Router();

/////////////ROUTES///////////////
//API routes that will be handled to/from the backend
const apiRoutes = require("./api");
//Any Routes that will be handled by the user from the homepage
const homeRoutes = require("./homeRoutes.js");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;
