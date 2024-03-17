const router = require("express").Router();
const withAuth = require("../utils/auth");
const { User, Journey, Comment, Trip } = require("../models/");

//Renders the homepage
router.get("/", (req, res) => {
    try {
        res.render("homepage", {
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//Renders login page
router.get("/login", async (req, res) => {
    try {
        res.render("login");
    } catch (err) {
        res.status(500).json(err);
    }
});

//Renders journeys page
router.get("/journeys", async (req, res) => {
    try {
        // Get all projects and JOIN with user data
        const journeyData = await Journey.findAll({
            include: [
                {
                    model: Comment,
                    attributes: ["comment_text"],
                },
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
        });

        // Serialize data so the template can read it
        const journeys = journeyData.map((journey) =>
            journey.get({ plain: true }),
        );

        // Pass serialized data and session flag into template
        res.render("journeys", {
            journeys,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/journeys/:id", async (req, res) => {
    try {
        const journeyData = await Journey.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });

        const journey = journeyData.get({ plain: true });

        res.render("journey", {
            ...journey,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//Renders user dashboard
router.get("/trips", withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ["password"] },
            include: [
                {
                    model: Trip,
                    attributes: [
                        "id",
                        "activities",
                        "accessories",
                        "funFact",
                        "city",
                        "state",
                        "month",
                        "userId",
                    ],
                },
            ],
        });

        const user = userData.get({ plain: true });
        console.log(user);

        res.render("my-trips", {
            user,
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/adventures", (req, res) => {
    try {
        res.render("adventures", {
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
