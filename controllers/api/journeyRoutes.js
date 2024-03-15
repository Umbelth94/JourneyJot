const router = require("express").Router();
const { Journey, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
    try {
        const journey = await Journey.create({
            journey_title: req.body.journey_title,
            vacation_type: req.body.vacation_type,
            location: req.body.location,
            content: req.body.content,
            user_id: req.session.user_id || req.body.user_id,
        });

        res.status(200).json(journey);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

router.get("/", async (req, res) => {
    try {
        const journeyData = await Journey.findAll({
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
        });
        res.status(200).json(journeyData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
