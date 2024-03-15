const router = require("express").Router();
const openai = require("../../utils/gptprompts.js");

router.post("/response", async (req, res) => {
    const { city, state, activity, month } = req.body;

    try {
        const responseData = await openai.response(
            city,
            state,
            activity,
            month,
        );
        res.json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
