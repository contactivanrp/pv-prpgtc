document.addEventListener("DOMContentLoaded", function () {
	const imgElements = document.querySelectorAll("img");

	imgElements.forEach(function (img) {
		const src = img.getAttribute("src");
		if (src && src.includes("/")) {
			const parts = src.split("/");
			let lastPart = parts[parts.length - 1];

			// Remove the file extension
			lastPart = lastPart.split(".")[0];

			let descriptionPrefix = "";
			if (lastPart.startsWith("bg-")) {
				descriptionPrefix = "Background featuring ";
				lastPart = lastPart.replace("bg-", "");
			} else if (lastPart.startsWith("im-")) {
				descriptionPrefix = "Image featuring ";
				lastPart = lastPart.replace("im-", "");
			} else if (lastPart.startsWith("icon-")) {
				descriptionPrefix = "Icon representing ";
				lastPart = lastPart.replace("icon-", "");
			}

			// Replace "-" and "_" with spaces and format the alt text
			const formattedAltText = descriptionPrefix + lastPart.replace(/[-_]/g, " ");
			img.setAttribute("alt", formattedAltText);
		}
	});
});

// Updating the copyright date
function getYear() {
	var element = document.getElementById("copyright-year");
	var currentYear = new Date().getFullYear();

	if (element) {
		// Insert the current year into the element's content
		element.textContent = currentYear;
	} else {
		console.log("Element not found.");
	}
}

getYear();

function getCalendar() {}
getCalendar();

/* start of final navbar */

$(".dropdown-toggle").on("click", function (event) {
	// The event won't be propagated up to the document NODE and
	// therefore delegated events won't be fired
	alert("click");
	event.stopPropagation();
});

/* end of final navbar */
