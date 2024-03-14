require("dotenv").config();
const chatGpt = require("openai");
const openai = new chatGpt({
    apiKey: process.env.OPENAPIKEY,
});

async function response(city, state, activity, month) {
    const activities = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        max_tokens: 200,
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant designed to output JSON",
            },
            {
                role: "user",
                // content: `List 5 things with a description and links for activties to do Green Bay, Wisconsin if the focus of the trip is camping in January`,
                content: `List 5 things with a description for activties to do ${city}, ${state} if the focus of the trip is ${activity} in ${month}`,
            },
        ],
    });
    const accessories = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        max_tokens: 200,
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant designed to output JSON",
            },
            {
                role: "user",
                // content: `List 5 things without a description for accessories to bring to Green Bay, Wisconsin if the focus of the trip is camping in January`,
                content: `List 5 things without a description for accessories to bring to ${city}, ${state} if the focus of the trip is ${activity} in ${month}`,
            },
        ],
    });
    const funFact = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        max_tokens: 100,
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant designed to output JSON",
            },
            {
                role: "user",
                // content: `What is an interesting fact about Green Bay, Wisconsin if the focus of the trip is camping. Keep it short.`,
                content: `What is an interesting fact about ${city}, ${state} if the focus of the trip is ${activity}`,
            },
        ],
    });

    const activitiesJSON = JSON.stringify(activities.choices[0]);
    const accessoriesJSON = JSON.stringify(accessories.choices[0]);
    const funFactJSON = JSON.stringify(funFact.choices[0]);

    const activitiesJSONO = JSON.parse(activitiesJSON);
    const accessoriesJSONO = JSON.parse(accessoriesJSON);
    const funFactJSONO = JSON.parse(funFactJSON);

    const response = {
        activites: activitiesJSONO.message.content,
        accessories: accessoriesJSONO.message.content,
        funFact: funFactJSONO.message.content,
    };

    console.log(response);
}

module.exports = { response };
