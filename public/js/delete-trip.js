const delButtonHandler = async (event) => {
    if (event.target.hasAttribute("data-id")) {
        const id = event.target.getAttribute("data-id");

        const response = await fetch(`/api/trips/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            document.location.replace("/trips");
        } else {
            alert("Failed to delete post");
        }
    }
};

document
    .querySelector(".btn-delete-trip")
    .addEventListener("click", delButtonHandler);
