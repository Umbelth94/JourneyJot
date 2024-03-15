require("dotenv").config();
const chatGpt = require("openai");
const openai = new chatGpt({
    apiKey: process.env.OPENAPIKEY,
});

async function response(city, state, activity, month) {
    const activitiesPrompt = {
        prompt: "Respond only using this JSON object with the properties included in this JSON object.  Respond with only valid JSON",
        question: `List 5 things with a description for activities to do at/in ${city} ${state} if the focus of the trip is ${activity} in ${month}.  ThingsToDo should have a property called activity and a property called description.  Always respond with at least one activity`,
        thingsToDo: [],
    };
    console.log("activitiesPrompt", activitiesPrompt);
    const activitiesResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        max_tokens: 350,
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant designed to output JSON",
            },
            {
                role: "user",
                // content: `List 5 things with a description and links for activties to do Green Bay, Wisconsin if the focus of the trip is camping in January`,
                content: JSON.stringify(activitiesPrompt),
            },
        ],
    });

    console.log("Response from chatGpt:", activitiesResponse);
    const accessoriesResponse = await openai.chat.completions.create({
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
    const funFactResponse = await openai.chat.completions.create({
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

    console.log(
        "GPT RESPONSE BEFORE HITTING FRONTEND",
        activitiesResponse.choices[0].message,
    );
    const activitiesContent = activitiesResponse.choices[0].message.content;
    const accessoriesContent = accessoriesResponse.choices[0].message.content;
    const funFactContent = funFactResponse.choices[0].message.content;

    const responseData = {
        activities: activitiesContent,
        accessories: accessoriesContent,
        funFact: funFactContent,
    };

    console.log("response data: " + responseData);
    return responseData;
}

module.exports = { response };
