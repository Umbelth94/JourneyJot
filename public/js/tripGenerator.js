//Export some of this data to a handlebars partial.

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".gpt-form");
    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();
            const responseCardTitle =
                document.getElementById("responseCardHeader");
            responseCardTitle.textContent = "";

            // Get the values from the form
            const loading = document.getElementById("loading");

            const city = document.getElementById("city").value;
            const upperCaseCity = city[0].toUpperCase() + city.slice(1);
            const state = document.getElementById("state").value;
            const activity = document.getElementById("activity").value;
            const month = document.getElementById("month").value;
            console.log(city, state, activity, month);
            loading.remove();
            const image = document.createElement("img");
            image.src = "../images/waiting.avif";
            //Change the title to reflect the city that the user inputs
            responseCardTitle.textContent =
                "Loading trip to " + upperCaseCity + "...";
            responseCardTitle.classList.add(
                "font-bold",
                "mb-10",
                "text-center",
                "text-shadow",
                "text-5xl",
                "mt-5",
                "font-extrabold",
                "color-mine",
            );
            image.classList.add(
                "my-10",
                "text-center",
                "text-shadow",
                "rounded-2xl",
                "w-8/12",
                "mx-auto",
            );
            responseCardTitle.appendChild(image);
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
                console.log(responseData);
                image.remove();
                renderResponse(responseData);
            } catch (error) {
                console.error(error);
            }
        });
    }
});

function renderActivities(responseData) {
    const activitiesResponse = document.getElementById("activitiesResponse");

    //Parse the JSON data from response
    const activities = responseData.activities;
    console.log(activities);

    activitiesResponse.innerHTML = "";
    const city = document.getElementById("city").value;
    const upperCaseCity = city[0].toUpperCase() + city.slice(1);
    const responseCardTitle = document.getElementById("responseCardHeader");
    responseCardTitle.textContent = "Adventure to " + upperCaseCity;
    responseCardTitle.classList.add(
        "font-bold",
        "mb-10",
        "text-center",
        "text-shadow",
        "text-5xl",
        "mt-5",
    );

    //Create the general title
    const title = document.createElement("h3");
    title.textContent = "Activities:";
    title.classList.add("color-mine", "text-3xl");
    activitiesResponse.appendChild(title);
    //Loop through the activities array
    activities.forEach((activity) => {
        console.log("looping through thingsToDo");

        //Create title for each element
        const titleActivity = document.createElement("h3");
        titleActivity.textContent = activity.activity;
        titleActivity.classList.add("color-mine", "text-xl", "ml-5");
        //Create paragraph element for the "description"
        const description = document.createElement("p");
        description.classList.add("text-lg", "ml-7");
        description.textContent = activity.description;

        //Append titleActivity and description elements to activitiesResponse container
        activitiesResponse.appendChild(titleActivity);
        activitiesResponse.appendChild(description);
    });
}

function renderAccessories(responseData) {
    const accessoriesResponse = document.getElementById("accessoriesResponse");

    //Parse the JSON data from response
    const accessories = responseData.accessories;
    console.log(accessories);

    //Empty the accessories response container
    accessoriesResponse.innerHTML = "";

    //Create a title and list element
    const title = document.createElement("h3");
    title.textContent = "Recommended Items to Bring:";
    title.classList.add("color-mine", "text-3xl", "mt-7", "mb-2");
    const list = document.createElement("ul");

    //Loop through accessories array and append each item to the list
    accessories.items.forEach((item) => {
        console.log("looping through items");
        const listItem = document.createElement("li");
        listItem.classList.add("text-lg", "ml-8", "lists");
        listItem.textContent = item;

        list.appendChild(listItem);
    });

    //Append title and list to accessories container

    accessoriesResponse.appendChild(title);
    accessoriesResponse.appendChild(list);
}

function renderFunFact(responseData) {
    const funFactResponse = document.getElementById("funFactResponse");

    //Parse the funfact response from responseData
    const funFact = responseData.funFact;
    console.log(funFact);

    //Empty the funfact response container
    funFactResponse.innerHTML = "";

    //Create title and fact text elements
    const title = document.createElement("h3");
    title.textContent = "Fun Fact:";
    title.classList.add("color-mine", "text-3xl", "mt-7");
    const factText = document.createElement("p");
    factText.classList.add("text-lg");
    factText.textContent = funFact;

    //Append title and fact to funFactResponse container
    funFactResponse.appendChild(title);
    funFactResponse.appendChild(factText);
}

//This Button will need an eventlistener that adds all of our data to the database
function renderSubmitBtn(responseData) {
    const submitBtnContainer = document.getElementById("submitBtnContainer");

    // Check if all necessary response data is present
    if (
        responseData.activities &&
        responseData.accessories &&
        responseData.funFact
    ) {
        const saveTripBtn = document.createElement("button");
        saveTripBtn.textContent = "Save This Trip";
        saveTripBtn.classList.add(
            "btn-signup",
            "text-2xl",
            "text-black",
            "text-shadow",
            "save-trip",
        );
        //Pull the city, state, and month from the input form value and add them to the responseData object (This is needed for the trip model)
        responseData.city = document.getElementById("city").value;
        responseData.state = document.getElementById("state").value;
        responseData.month = document.getElementById("month").value;

        saveTripBtn.style.backgroundColor = "#99F2CD";
        saveTripBtn.addEventListener("click", async () => {
            try {
                const saveResponse = await fetch("/api/trips/save", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(responseData),
                });
                if (!saveResponse.ok) {
                    throw new Error("Failed to save trip");
                }
                alert("Trip has been saved successfully!");
                console.log("Trip saved successfully!");
            } catch (error) {
                console.error(error);
            }
        });

        const reloadBtn = document.createElement("button");
        reloadBtn.textContent = "Start New Trip";
        reloadBtn.classList.add(
            "btn-signup",
            "text-2xl",
            "text-black",
            "text-shadow",
            "text-center",
            "m-5",
            "new-trip",
        );
        reloadBtn.style.backgroundColor = "#99F2CD";
        reloadBtn.addEventListener("click", async () => {
            window.location.reload();
        });
        submitBtnContainer.appendChild(saveTripBtn);
        submitBtnContainer.appendChild(reloadBtn);
    } else {
        console.log("Button no render :(");
    }
}

//Render the response by running each of the render functions individually (Functions are seperated just to avoid having a giant render function);
function renderResponse(responseData) {
    renderActivities(responseData);
    renderAccessories(responseData);
    renderFunFact(responseData);
    renderSubmitBtn(responseData);
}
