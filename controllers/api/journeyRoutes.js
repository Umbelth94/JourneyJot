const router = require("express").Router();
const { Journey } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
    try {
        const newJourney = await Journey.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newJourney);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put("/:id", withAuth, async (req, res) => {
    try {
        const journey = await Journey.update(
            {
                journey_title: req.body.journey_title,
                vacation_type: req.body.vacation_type,
                location: req.body.location,
                accesories: req.body.accesories,
                content: req.body.content,
            },
            {
                where: {
                    id: req.params.id,
                },
            },
        );
        res.status(200).json(journey);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", withAuth, async (req, res) => {
    try {
        const journeyData = await Journey.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!journeyData) {
            res.status(404).json({ message: "No journey found with this id!" });
            return;
        }

        res.status(200).json(journeyData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
