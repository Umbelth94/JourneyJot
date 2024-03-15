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

function renderResponse(responseData) {
    const activitiesResponse = document.getElementById("activitiesResponse");
    const accessoriesResponse = document.getElementById("accessoriesResponse");
    const funFactResponse = document.getElementById("funFactResponse");

    console.log(`Activities: ${responseData.activities}`);
    console.log(`Accessories: ${responseData.accessories}`);
    console.log(`Fun Fact: ${responseData.funFact}`);

    activitiesResponse.textContent = `Activities: ${responseData.activities}`;
    accessoriesResponse.textContent = `Accessories: ${responseData.accessories}`;
    funFactResponse.textContent = `Fun Fact: ${responseData.funFact}`;
}
