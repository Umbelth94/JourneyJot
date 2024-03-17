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

// Route to fetch user's trips
// router.get("/", async (req, res) => {
//     try {
//         const userId = req.user.id;

//         // Fetch trips data for the logged-in user
//         const trip = await Trip.findAll({
//             where: { userId: userId },
//         });

//         res.render("trips", { trip });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

module.exports = router;
