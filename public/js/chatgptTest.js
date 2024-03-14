const { response } = require("../../utils/chatgpt");

document
    .getElementById("journeyForm")
    .addEventListener("submit", async function (event) {
        event.preventDefault();

        // Get the values from the form
        const city = document.getElementById("city").value;
        const state = document.getElementById("state").value;
        const activity = document.getElementById("activity").value;
        const month = document.getElementById("month").value;
        console.log(city, state, activity, month);
        // Call the response function with the form values
        const responseData = await response(city, state, activity, month);
        console.log(responseData);
        renderResponse(responseData);
    });

function renderResponse(responseData) {
    const activitiesResponse = document.getElementById("activitiesResponse");
    const accessoriesResponse = document.getElementById("accessoriesResponse");
    const funFactResponse = document.getElementById("funFactResponse");

    activitiesResponse.textContent = `Activities: ${responseData.activites}`;
    accessoriesResponse.textContent = `Accessories: ${responseData.accessories}`;
    funFactResponse.textContent = `Fun Fact: ${responseData.funFact}`;
}
