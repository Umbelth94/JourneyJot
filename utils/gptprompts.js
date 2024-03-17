require("dotenv").config();
const chatGpt = require("openai");
const openai = new chatGpt({
    apiKey: process.env.OPENAPIKEY,
});

async function response(city, state, activity, month) {
    const activitiesPrompt = {
        prompt: "Respond only using this JSON object with the properties included in this JSON object.  Respond with only valid JSON",
        question: `List 5 things with a description for activities to do at/in ${city} ${state} if the focus of the trip is ${activity} in ${month}.  activities should have a property called activity and a property called description.  Always respond with at least one activity`,
        // activities: [],
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

    //Modifying The Response to get rid of the problem of redundant "accessories" nesting

    const accessoriesPrompt = {
        prompt: "Respond only using this JSON object with the properties included in this JSON object.  Respond with only valid JSON",
        question: `List 5 items without a description for things to bring to ${city} ${state} relating to the season and weather that correlates with the month of ${month} if the focus of the trip is ${activity}. The array of items should be called items.  Always respond with at least one item`,
        // thingsToDo: [],
    };
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
                content: JSON.stringify(accessoriesPrompt),
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
                content: `What is an interesting fact about ${city}, ${state} if the focus of the trip is ${activity}`,
            },
        ],
    });

    console.log(
        "GPT RESPONSE BEFORE HITTING FRONTEND",
        activitiesResponse.choices[0].message,
    );

    //Parsing these from JSON to send them as cleaner Javascript objects to the frontend
    //This ActivitiesContent also applys a fix that removes nested activities objects from the original JSON format.  No matter how I modified the prompt, it would always return redundant nested "activities" in the JSON, so this just makes sure that doesn't happen
    const activitiesContent = JSON.parse(
        activitiesResponse.choices[0].message.content,
    ).activities;
    const accessoriesContent = JSON.parse(
        accessoriesResponse.choices[0].message.content,
    );
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
