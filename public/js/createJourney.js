const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#journey-title").value.trim();
    const types = document
        .querySelector('input[name="option"]:checked')
        .value.trim();
    const where = document.querySelector("#where").value.trim();
    const experience = document.querySelector("#experience").value.trim();

    if (title && types && where && experience) {
        const response = await fetch(`/api/journeys`, {
            method: "POST",
            body: JSON.stringify({
                journey_title: title,
                vacation_type: types,
                location: where,
                content: experience,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            document.location.replace("/journeys");
        } else {
            alert("Failed to create journey");
        }
    }
};

document
    .querySelector(".new-journey-form")
    .addEventListener("submit", newFormHandler);
