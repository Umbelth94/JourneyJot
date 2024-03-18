const express = require("express");
const router = express.Router();
const { Trip } = require("../../models");
const withAuth = require("../../utils/auth");

// Route to save trip data to the database
router.post("/save", withAuth, async (req, res) => {
    try {
        const { activities, accessories, funFact, city, state, month } =
            req.body;
        const userId = req.session.user_id;

        // Save the trip data to the database
        const trip = await Trip.create({
            activities: activities,
            accessories: accessories,
            funFact: funFact,
            city: city,
            state: state,
            month: month,
            userId: userId,
        });

        res.status(201).json({ trip }); // Send a response indicating successful creation
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Route to fetch a specific trip
router.get("/:id", withAuth, async (req, res) => {
    try {
        const tripData = await Trip.findByPk(req.params.id);

        const trip = tripData.get({ plain: true });

        if (!tripData) {
            return res.status(404).json({ error: "Trip not found" });
        }

        res.render("specific-trip", {
            trip,
            logged_in: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete Trip Route
router.delete("/:id", withAuth, async (req, res) => {
    try {
        const trip = await Trip.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!trip) {
            res.status(404).json({ error: "Trip not found." });
            return;
        }

        res.status(200).json({ message: "Trip deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
