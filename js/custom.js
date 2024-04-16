document.addEventListener("DOMContentLoaded", function () {
	var alertBar = `
    <div class="c-alert-bar">
      <button class="main-bar" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <div class="main-text">
          Notice: Punggol Town Council Office (Block 603 Punggol Road) is temporarily closed until further notice.
          <div class="cta-text">
            Learn Why
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256">
              <path d="M228,104a12,12,0,0,1-24,0V69l-59.51,59.51a12,12,0,0,1-17-17L187,52H152a12,12,0,0,1,0-24h64a12,12,0,0,1,12,12Zm-44,24a12,12,0,0,0-12,12v64H52V84h64a12,12,0,0,0,0-24H48A20,20,0,0,0,28,80V208a20,20,0,0,0,20,20H176a20,20,0,0,0,20-20V140A12,12,0,0,0,184,128Z"></path>
            </svg>
          </div>
        </div>
      </button>
      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <img src="im/notice_temporary_punggol_office_closure.jpeg" alt="" />
          </div>
        </div>
      </div>
    </div>
  `;

	var body = document.querySelector("body");
	body.insertAdjacentHTML("afterbegin", alertBar);
});

document.addEventListener("DOMContentLoaded", function () {
	const mainText = document.querySelector(".main-text");
	const exampleModal = document.getElementById("exampleModal");

	exampleModal.addEventListener("show.bs.modal", function () {
		mainText.classList.add("dimmed");
	});

	exampleModal.addEventListener("hide.bs.modal", function () {
		mainText.classList.remove("dimmed");
	});
});

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

// form validation

/* document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("feedbackForm");
	const submitButton = document.querySelector(".button_submit");
	let isSubmitAttempted = false; // Flag to check if submit has been attempted

	document.querySelectorAll('input[check*="required"], textarea[check*="required"]').forEach((field) => {
		const label = field.parentElement.querySelector("label");
		if (label) {
			label.innerHTML += '<span class="required-tag"> *</span>';
		}
	});

	const inputs = document.querySelectorAll("input, textarea");
	inputs.forEach((input, index) => {
		input.addEventListener("keydown", function (event) {
			if (event.key === "Enter") {
				if (input.tagName.toLowerCase() === "textarea") {
					// Allow the Enter key to function normally in textareas
					return;
				}
				event.preventDefault(); // Prevent form submission on Enter key for input fields

				// Move focus to the next input field if it exists
				const nextInput = inputs[index + 1];
				if (nextInput) {
					nextInput.focus();
				}
			}
		});
	});

	function required(value) {
		return value.trim() !== "";
	}
	function minLength(value, limit) {
		return value.length >= limit;
	}
	function maxLength(value, limit) {
		return value.length <= limit;
	}
	function onlyText(value) {
		return /^[a-zA-Z\s]+$/.test(value);
	}
	function email(value) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
	}
	function address(value) {
		return /^[a-zA-Z0-9\s.,#-]+$/.test(value);
	}
	function tel(value) {
		return /^\d{8}$/.test(value.replace(/\s/g, ""));
	}
	function date(value) {
		const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/(19|20)\d{2}$/;
		if (!dateRegex.test(value)) return false;

		const [day, month, year] = value.split("/").map(Number);
		const dateObj = new Date(year, month - 1, day);
		return dateObj.getFullYear() === year && dateObj.getMonth() === month - 1 && dateObj.getDate() === day;
	}

	function validateField(field) {
		const checkAttr = field.getAttribute("check");
		if (!checkAttr) {
			return true; // Skip validation if no 'check' attribute
		}

		const checks = checkAttr.split(" ");
		let isValid = true;
		let errorMessage = "";

		// Check for 'required' first and prioritize it
		if (checks.includes("required") && !required(field.value)) {
			isValid = false;
			errorMessage = "This field is required.";
		} else if (field.value.trim() === "") {
			// If the field is not required and empty, it's valid, clear any errors
			field.classList.remove("is-invalid");
			const errorElement = field.parentElement.querySelector(".error-message");
			if (errorElement) {
				errorElement.textContent = "";
			}
			return true; // If the field is not required and empty, it's valid
		} else {
			// Perform other validations if the field is not empty or not just required
			checks.forEach((check) => {
				const [rule, param] = check.split("-");
				if (!isValid) return; // If already invalid, skip further checks

				switch (rule) {
					case "min":
						isValid = minLength(field.value, parseInt(param));
						errorMessage = `Minimum ${param} characters required.`;
						break;
					case "max":
						isValid = maxLength(field.value, parseInt(param));
						errorMessage = `Cannot exceed ${param} characters.`;
						break;
					case "only":
						if (param === "text") {
							isValid = onlyText(field.value);
							errorMessage = "Only text characters are allowed.";
						}
						break;
					case "email":
						isValid = email(field.value);
						errorMessage = "Invalid email address.";
						break;
					case "address":
						isValid = address(field.value);
						errorMessage = "Invalid address format.";
						break;
					case "tel":
						isValid = tel(field.value);
						errorMessage = "Invalid phone number format.";
						break;
					case "date":
						isValid = date(field.value);
						errorMessage = "Invalid date format. Please use dd/mm/yyyy.";
						break;
				}
			});
		}

		const errorElement = field.parentElement.querySelector(".error-message");
		if (!isValid && isSubmitAttempted) {
			field.classList.add("is-invalid");
			if (errorElement) {
				errorElement.textContent = errorMessage;
			}
		} else {
			field.classList.remove("is-invalid");
			if (errorElement) {
				errorElement.textContent = "";
			}
		}

		return isValid;
	}

	function validateForm() {
		let isFormValid = true;
		form.querySelectorAll(".form-control").forEach((field) => {
			if (!validateField(field)) {
				isFormValid = false;
			}
		});

		// Update submit button class based on form validity
		submitButton.classList.toggle("is-disabled", !isFormValid);

		if (isFormValid && !isSubmitAttempted) {
			// Set the flag when form validation passes without errors
			isSubmitAttempted = true;
		}

		return isFormValid;
	}

	form.querySelectorAll(".form-control").forEach((field) => {
		field.addEventListener("input", function () {
			validateField(field); // Validate without showing errors until submit is attempted
			validateForm(); // Call validateForm to update submit button class
		});
	});

	form.addEventListener("submit", function (event) {
		isSubmitAttempted = true; // Set flag on first submit attempt

		if (!validateForm()) {
			event.preventDefault();

			const firstInvalidField = form.querySelector(".is-invalid");
			if (firstInvalidField) {
				firstInvalidField.focus();
			}
		} else {
			// Form is valid, perform submission logic here
			console.log("Form submitted successfully!");
		}
	});

	// Perform a silent validation on load to set initial state of the submit button
	validateForm();
}); */

/* start of final navbar */

$(".dropdown-toggle").on("click", function (event) {
	// The event won't be propagated up to the document NODE and
	// therefore delegated events won't be fired
	alert("click");
	event.stopPropagation();
});

/* end of final navbar */
