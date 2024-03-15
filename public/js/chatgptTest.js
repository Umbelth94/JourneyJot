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
        console.log("looping through thingsToDo");
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

function renderAccessories(responseData) {
    const accessoriesResponse = document.getElementById("accessoriesResponse");

    const accessories = JSON.parse(responseData.accessories);
    console.log(accessories);

    accessoriesResponse.innerHTML = "";

    const title = document.createElement("h3");
    title.textContent = "Reccomended Items to Bring:";
    const list = document.createElement("ul");
    accessories.items.forEach((item) => {
        console.log("looping through items");
        const listItem = document.createElement("li");
        listItem.textContent = item;

        list.appendChild(listItem);
    });
    accessoriesResponse.appendChild(title);
    accessoriesResponse.appendChild(list);
}
function renderResponse(responseData) {
    renderActivities(responseData);
    renderAccessories(responseData);
}

// function renderResponse(responseData) {
//     const activitiesResponse = document.getElementById("activitiesResponse");
//     const accessoriesResponse = document.getElementById("accessoriesResponse");
//     const funFactResponse = document.getElementById("funFactResponse");

//     console.log(`Activities: ${responseData.activities}`);
//     console.log(`Accessories: ${responseData.accessories}`);
//     console.log(`Fun Fact: ${responseData.funFact}`);

//     activitiesResponse.textContent = `Activities: ${responseData.activities}`;
//     accessoriesResponse.textContent = `Accessories: ${responseData.accessories}`;
//     funFactResponse.textContent = `Fun Fact: ${responseData.funFact}`;
// }
