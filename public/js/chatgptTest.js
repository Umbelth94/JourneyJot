document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".gpt-form");
    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            // Get the values from the form
            const city = document.getElementById("city").value;
            const state = document.getElementById("state").value;
            const activity = document.getElementById("activity").value;
            const month = document.getElementById("month").value;
            console.log(city, state, activity, month);
            // Call the response function with the form values

            try {
                const response = await fetch("/api/gpt/response", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ city, state, activity, month }),
                });
                if (!response.ok) {
                    throw new Error("Failed to get response");
                }

                const responseData = await response.json();
                renderResponse(responseData);
            } catch (error) {
                console.error(error);
            }
        });
    }
});

function renderActivities(responseData) {
    const activitiesResponse = document.getElementById("activitiesResponse");

    const activities = JSON.parse(responseData.activities);
    console.log(responseData);
    console.log(activities);

    activitiesResponse.innerHTML = "";

    //Loop through the activities array
    activities.thingsToDo.forEach((activity) => {
        console.log("looopiiiiiing");
        //Create title element for the "thing"
        const title = document.createElement("h3");
        title.textContent = activity.activity;

        //Create paragraph element for the "description"
        const description = document.createElement("p");
        description.textContent = activity.description;

        //Append title and description elements to activitiesResponse container
        activitiesResponse.appendChild(title);
        activitiesResponse.appendChild(description);
    });
}

function renderResponse(responseData) {
    renderActivities(responseData);
}
