const deleteBtns = document.querySelectorAll(".btn-delete");

deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", async () => {
        try {
            const tripId = deleteBtn.getAttribute("data-id");
            console.log(tripId);
            const response = await fetch(`/api/trips/${tripId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete object");
            }
            console.log("Object deleted successfully!");
        } catch (error) {
            console.error(error);
        }
    });
});
