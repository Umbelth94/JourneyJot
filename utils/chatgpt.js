require("dotenv").config();
const chatGpt = require("openai");
const openai = new chatGpt({
    apiKey: process.env.OPENAPIKEY,
});

async function response() {
    const activities = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        max_tokens: 200,
        // response_format = {'type': 'json_object'},
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant designed to output JSON",
            },
            {
                role: "user",
                content: "What 5 things to do in Missoula, Montana",
            },
            // { role: "user", content: "What are 5 items we need to bring on a camping trip" },
        ],
    });
    const accessories = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        max_tokens: 200,
        // response_format = {'type': 'json_object'},
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant designed to output JSON",
            },
            // { role: "user", content: "What 5 things to do in Missoula, Montana" },
            {
                role: "user",
                content: "What are 5 items we need to bring on a camping trip",
            },
        ],
    });
    // completion.choices.forEach((choice, index) => {
    //     console.log(`Response ${index + 1}: ${choice.message[0].content}`)
    //     console.log(`Response ${index}: ${choice.message[1].content}`)

    // })

    const activitiesJSONresponse = JSON.stringify(activities.choices[0]);
    const accessoriesJSONresponse = JSON.stringify(accessories.choices[0]);

    console.log(activitiesJSONresponse);
    console.log(accessoriesJSONresponse);
}

response();
